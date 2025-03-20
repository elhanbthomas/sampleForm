const fetchData = () => {
    const data = localStorage.getItem("UserData");
    const parsed = JSON.parse(data);
    let table_values = "";
    const tbody = document.getElementById("tbody");
    parsed.forEach((row) => {
        let row_data = "<tr><td>" + row.name + "</td><td>" + row.email + "</td><td>" + 
        row.password + "</td><td>" + row.dob + "</td><td>" + row.terms + "</td></tr>";
        table_values += row_data;
    });
    console.log(table_values);
    tbody.innerHTML = table_values;
}


document.addEventListener("DOMContentLoaded", function () {
let date = new Date();
let year = date.getFullYear();
let month = String(date.getMonth() + 1).padStart(2, '0');
let day = String(date.getDate()).padStart(2, '0');

let maxDate = (year - 18) + "-" + month + "-" + day-1;
let minDate = (year - 55) + "-" + month + "-" + day+1;

const DOB = document.getElementById("dob");
if (DOB) {
    DOB.setAttribute("max", maxDate);
    DOB.setAttribute("min", minDate);
}

let form = document.getElementById("form");
form.addEventListener("submit", addData);
fetchData();
});




let entries = localStorage.getItem("UserData") ? JSON.parse(localStorage.getItem("UserData")) : [];
const addData = (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const terms = document.getElementById("terms").checked;

    const data = {
        name: name,
        email: email,
        password: password,
        dob: dob,
        terms: terms,
    };
    entries.push(data);
    localStorage.setItem("UserData", JSON.stringify(entries));
    form.reset();

    fetchData();
}