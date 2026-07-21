// ==========================
// Get Form Elements
// ==========================

const form = document.getElementById("signupForm");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

// ==========================
// Validation Functions
// ==========================

function setValid(input) {
    input.classList.remove("invalid");
    input.classList.add("valid");
}

function setInvalid(input) {
    input.classList.remove("valid");
    input.classList.add("invalid");
}

function clearValidation() {
    document.querySelectorAll("input").forEach(input => {
        input.classList.remove("valid", "invalid");
    });
}

function isEmailValid(emailValue) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(emailValue);
}

function isPhoneValid(phoneValue) {
    const phonePattern = /^[0-9+\-\s]{10,15}$/;
    return phonePattern.test(phoneValue);
}

// ==========================
// Form Validation
// ==========================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    clearValidation();

    let isValid = true;

    // ----------------------
    // First Name
    // ----------------------

    if (firstName.value.trim() === "") {
        setInvalid(firstName);
        isValid = false;
    } else {
        setValid(firstName);
    }

    // ----------------------
    // Last Name
    // ----------------------

    if (lastName.value.trim() === "") {
        setInvalid(lastName);
        isValid = false;
    } else {
        setValid(lastName);
    }

    // ----------------------
    // Email
    // ----------------------

    if (
        email.value.trim() === "" ||
        !isEmailValid(email.value.trim())
    ) {
        setInvalid(email);
        isValid = false;
    } else {
        setValid(email);
    }

    // ----------------------
    // Phone Number
    // ----------------------

    if (
        phone.value.trim() === "" ||
        !isPhoneValid(phone.value.trim())
    ) {
        setInvalid(phone);
        isValid = false;
    } else {
        setValid(phone);
    }

    // ----------------------
    // Password
    // ----------------------

    if (password.value.length < 8) {
        setInvalid(password);
        isValid = false;
    } else {
        setValid(password);
    }

    // ----------------------
    // Confirm Password
    // ----------------------

    if (
        confirmPassword.value.length < 8 ||
        confirmPassword.value !== password.value
    ) {
        setInvalid(confirmPassword);
        setInvalid(password);
        isValid = false;
    } else {
        setValid(confirmPassword);
    }

    // ----------------------
    // Success
    // ----------------------

    if (isValid) {

        alert("Account created successfully!");

        form.reset();

        clearValidation();

    }

});

// ==========================
// Live Validation
// ==========================

const inputs = document.querySelectorAll("input");

inputs.forEach(input => {

    input.addEventListener("input", function () {

        if (input.value.trim() === "") {
            input.classList.remove("valid", "invalid");
            return;
        }

        switch (input.id) {

            case "email":
                isEmailValid(input.value)
                    ? setValid(input)
                    : setInvalid(input);
                break;

            case "phone":
                isPhoneValid(input.value)
                    ? setValid(input)
                    : setInvalid(input);
                break;

            case "password":

                if (input.value.length >= 8) {
                    setValid(input);
                } else {
                    setInvalid(input);
                }

                if (confirmPassword.value !== "") {

                    if (
                        password.value === confirmPassword.value &&
                        password.value.length >= 8
                    ) {
                        setValid(password);
                        setValid(confirmPassword);
                    } else {
                        setInvalid(password);
                        setInvalid(confirmPassword);
                    }

                }

                break;

            case "confirmPassword":

                if (
                    input.value === password.value &&
                    input.value.length >= 8
                ) {
                    setValid(input);
                    setValid(password);
                } else {
                    setInvalid(input);
                }

                break;

            default:

                if (input.value.trim() !== "") {
                    setValid(input);
                } else {
                    setInvalid(input);
                }

        }

    });

});