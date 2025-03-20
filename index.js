const fetchData = () => {
    const data = localStorage.getItem("UserData");
    let parsed = data ? JSON.parse(data) : [];

    let table_values = "";
    const tbody = document.getElementById("tbody");

    if (parsed.length > 0) {
        parsed.forEach((row) => {
            let row_data = `<tr>
                                <td>${row.name}</td>
                                <td>${row.email}</td>
                                <td>${row.password}</td>
                                <td>${row.dob}</td>
                                <td>${row.terms ? "Accepted" : "Not Accepted"}</td>
                            </tr>`;
            table_values += row_data;
        });
    } else {
        table_values = "<tr><td colspan='5' class='text-center'>No data found</td></tr>";
    }

    tbody.innerHTML = table_values;
};

document.addEventListener("DOMContentLoaded", function () {
    let date = new Date();
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');

    let maxDate = (year - 18) + "-" + month + "-" + day;
    let minDate = (year - 55) + "-" + month + "-" + day;

    const DOB = document.getElementById("dob");
    if (DOB) {
        DOB.setAttribute("max", maxDate);
        DOB.setAttribute("min", minDate);
    }

    let form = document.getElementById("form");
    form.addEventListener("submit", addData);

    fetchData();
});

const addData = (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const dob = document.getElementById("dob").value;
    const terms = document.getElementById("terms").checked;

    // ✅ Email Validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // ✅ Age Validation (18-55)
    const dobDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    if (age < 18 || age > 55) {
        alert("You must be between 18 and 55 years old.");
        return;
    }

    let entries = localStorage.getItem("UserData") ? JSON.parse(localStorage.getItem("UserData")) : [];

    const data = { name, email, password, dob, terms };
    entries.push(data);

    localStorage.setItem("UserData", JSON.stringify(entries));

    document.getElementById("form").reset();

    fetchData();
};
