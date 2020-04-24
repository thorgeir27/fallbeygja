const inputs = document.querySelectorAll(".form-control-lg");

inputs.forEach(input => {
    input.addEventListener("change", (event) => {
        const userAns = event.target.value;
        const ans = document.querySelector("#" + event.target.name).value;

        if (ans === userAns) {
            input.style.backgroundColor = "#bdffe2";
            input.style.border = "3px solid #30e395";
        } else {
            input.style.backgroundColor = "#ffb3b3";
            input.style.border = "3px solid #e84545";
        }
    });
});