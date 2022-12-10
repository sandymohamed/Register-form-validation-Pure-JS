const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmPasswor = document.getElementById('confirmPasswor')
var formError = true;

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        username: username.value,
        email: email.value,
        password: password.value,
        password_confirmation: confirmPasswor.value
    }

    // check that every field has not any errors before post data
    if (formError === false) {

        await fetch('https://goldblv.com/api/hiring/tasks/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)

        })
            .then((response) => console.log('Success:', response))
            .then(() => {
                localStorage.setItem('user', email.value);
                window.location.replace("./loggedin.html");
            })
            .catch((error) => {
                Toastify({
                    text: `Error: ${error.toString()}`,
                    className: "error",
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast();
            });

    }

})

const validateValues = (param) => {

    // get the values from inputs
    const usernameValue = username.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const confirmPassworValue = confirmPasswor.value;

    if (param === "username") {
        //    username validation
        if (usernameValue === '') {
            // show error
            // add error class
            setErrorFor(username, "username can't be empty")
        } else if (!validUsername(usernameValue)) {
            setErrorFor(username, "username is not valid")

        }
        else {
            // add success class
            setSuccessFor(username)
        }
    }

    if (param === "email") {
        //    email validation
        if (emailValue === '') {
            setErrorFor(email, "email can't be empty")
        } else if (!isEmail(emailValue)) {
            setErrorFor(email, "email is not valid")
        } else {
            setSuccessFor(email)
        }
    }

    if (param === "password") {
        //    password validation
        if (passwordValue === '') {
            setErrorFor(password, "password can't be empty")
        } else if (passwordValue.length < 8) {
            setErrorFor(password, "Password must be at least 8 characters")
        } else {
            setSuccessFor(password)
        }

    }
    if (param === "confirm") {
        //   confirm password validation
        if (confirmPassworValue === '') {
            setErrorFor(confirmPasswor, "confirm password can't be empty")
        } else if (passwordValue !== confirmPassworValue) {
            setErrorFor(confirmPasswor, "Passwords does not match")
        } else {
            setSuccessFor(confirmPasswor)
        }

    }
}

const setErrorFor = (input, message) => {
    // access .form-control
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    // add error message inside small
    small.innerText = message;

    // add error class
    formControl.className = 'form-control form-item error'

    formError = true;
}

const setSuccessFor = (input) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    // add success class
    formControl.className = 'form-control form-item success'

    // remove error message from small
    small.innerText = '';

    formError = false;

}

const isEmail = (email) => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

const validUsername = (username) => {
    return /^[A-Za-z][A-Za-z0-9]{3,13}[A-Za-z]$/.test(username)
}


