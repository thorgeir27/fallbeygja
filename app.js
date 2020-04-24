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
            const ordData = {ord: pData[0].ord};
            pData[0].bmyndir.forEach(bMynd => {
                ordData[bMynd.g] = bMynd.b;
            });
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
    const newData = {ord: data[0].ord};
    
    data[0].bmyndir.forEach(bMynd => {
        newData[bMynd.g] = bMynd.b;
    });

}