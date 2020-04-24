const express = require("express");
const https = require("https");
const guids = require(__dirname + "/guids");

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

const url = "https://bin.arnastofnun.is/api/ord/";
const IDs = guids.ids;


app.get("/", function(req, res) {
    const id = IDs[Math.floor(Math.random() * IDs.length)];

    const query = url + id;
    https.get(query, function(response) {
        response.on("data", function(data) {
            const pData = JSON.parse(data);
            ordData = parseData(pData);
            res.render("index", {ordData: ordData});
        });
    });
});


app.get("/:guid", function(req, res) {
    const id = req.params.guid
    const query = url + id;
    https.get(query, function(response) {
        response.on("data", function(data) {
            res.send(JSON.parse(data));
        });
    });
});


app.listen(3000, function () {
    console.log("Server is running on port 3000");
});


function parseData(data) {
    const newData = {
        ord: data[0].ord,
        et: [],
        etgr: [],
        ft: [],
        ftgr: []
    };
    
    data[0].bmyndir.forEach(bMynd => {
        const form = bMynd.g;

        if (form.includes("ETgr")) {
            newData.etgr.push(bMynd.b);
        } else if (form.includes("ET")) {
            newData.et.push(bMynd.b);
        } else if (form.includes("FTgr")) {
            newData.ftgr.push(bMynd.b);
        } else if (form.includes("FT")) {
            newData.ft.push(bMynd.b);
        }
    });
    return newData;
}