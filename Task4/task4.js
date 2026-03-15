const form = document.getElementById("form");

document.getElementById("name").addEventListener("input", function () {
    let name = this.value;
    let lettersOnly = /^[A-Za-z ]+$/;

    if (!lettersOnly.test(name)) {
        document.getElementById("nameError").innerText = "Only letters allowed";
    } else {
        document.getElementById("nameError").innerText = "";
    }
});


document.getElementById("email").addEventListener("input", function () {
    let email = this.value;

    if (email.includes("@") && email.includes(".")) {
        document.getElementById("emailError").innerText = "";
    } else {
        document.getElementById("emailError").innerText = "Invalid email";
    }
});


document.getElementById("password").addEventListener("input", function () {
    let pass = this.value;
    let strength = 0;

    if (pass.length >= 8) strength++;
    if (pass.match(/[A-Z]/)) strength++;
    if (pass.match(/[a-z]/)) strength++;
    if (pass.match(/[0-9]/)) strength++;
    if (pass.match(/[@!#$]/)) strength++;

    let percent = Math.floor((strength / 5) * 100);
    document.getElementById("strength").innerText =
        "Password Strength: " + percent + "%";

    if (percent < 60) {
        document.getElementById("passError").innerText = "Weak password";
    } else {
        document.getElementById("passError").innerText = "";
    }
});


document.getElementById("dob").addEventListener("change", function () {
    let dob = new Date(this.value);
    let today = new Date();
    let age = today.getFullYear() - dob.getFullYear();

    if (age < 18) {
        document.getElementById("dobError").innerText = "Must be 18 or above";
    } else {
        document.getElementById("dobError").innerText = "";
    }
});


document.getElementById("phone").addEventListener("input", function () {
    let phone = this.value;

    if (phone.length !== 10 || isNaN(phone)) {
        document.getElementById("phoneError").innerText =
            "Enter 10 digit number";
    } else {
        document.getElementById("phoneError").innerText = "";
    }
});


form.addEventListener("submit", function (e) {
    e.preventDefault();

    let errors = document.querySelectorAll("span");
    let valid = true;

    errors.forEach(function (error) {
        if (error.innerText !== "") {
            valid = false;
        }
    });

    if (valid) {
        alert("Form Submitted Successfully!");
        form.reset();
        document.getElementById("strength").innerText = "";
    } else {
        alert("Please fix errors first");
    }
});
