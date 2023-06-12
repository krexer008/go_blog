"use strict";

const keyEmail = "Email";
const keyPassword = "Password";

window.addEventListener('load', pageLoaded);

const form = this.document.getElementById('form');
const userEmail = this.document.getElementById(keyEmail);
const userPassword = this.document.getElementById(keyPassword);
const elemButton = this.document.querySelector('#submitButton');
const elemToggle = this.document.getElementById('toggle');

function pageLoaded(e) {


    fieldTextHandler(userEmail, keyEmail);

    fieldTextHandler(userPassword, keyPassword);

    elemToggle.addEventListener('click', toggleClick);

    elemButton.addEventListener("click", sendForm);
}

async function sendForm(event) {

    event.preventDefault();

    let error = formValidate();

    const formIncorrect = document.querySelector('#status_incorect');
    const formInvalid = document.querySelector('#status_invalid');

    formIncorrect.classList.add('hide_element');
    formInvalid.classList.add('hide_element');

    if (error === 0) {

        /*
                const response = await fetch('/api/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        userEmail: userEmail.value,
                        userPass: userPassword.value
                    })
                })
        
                if (response.ok) {
                    formInvalid.classList.add('hide_element');
                    formIncorrect.classList.add('hide_element');
                    //window.location.href - response.url;
                } else if (response.status === 401) {
                    console.log("not authorizate");
                    formIncorrect.classList.remove('hide_element');
                    userEmail.classList.add("form__field_critical");
                    userPassword.classList.add("form__field_critical");
                }
        
                */
    } else {
        formInvalid.classList.remove('hide_element');
    }
}

function formValidate() {
    let error = 0;
    const emailRequired = document.querySelector('#email_required');
    const passRequired = document.querySelector('#password_required');
    const emailIncorrect = document.querySelector('#incorrect_email');

    emailRequired.classList.add('hide_element');
    emailRequired.classList.remove('form__required_critical');
    passRequired.classList.add('hide_element');
    passRequired.classList.remove('form__required_critical');
    emailIncorrect.classList.add('hide_element');

    if (userEmail.value) {
        emailIncorrect.classList.add('hide_element');
        userEmail.classList.remove('form__field_critical');

        if (!emailTest(userEmail)) {
            emailIncorrect.classList.remove('hide_element');
            userEmail.classList.add('form__field_critical');
            error++;
        }

    } else {
        emailIncorrect.classList.add('hide_element');
        emailRequired.classList.remove('hide_element');
        emailRequired.classList.add('form__required_critical');
        userEmail.classList.add('form__field_critical');
        error++;
    }

    if (!passTest(userPassword)) {
        passRequired.classList.remove('hide_element');
        passRequired.classList.add('form__required_critical');
        userPassword.classList.add('form__field_critical');
        error++
    } else {
        passRequired.classList.add('hide_element');
        passRequired.classList.remove('form__required_critical');
        userPassword.classList.remove('form__field_critical');
    }

    return error;
}

function emailTest(field) {
    return /\S+@\S+\.\S+/.test(field.value);
}

function passTest(field) {
    return /[A-Za-z0-9\s]{1,}/.test(field.value);
}



function fieldTextHandler(field, key) {

    field.addEventListener('focus', () => {
        field.classList.remove('form__field_full');
        field.classList.add('form__field_focused');
    });

    field.addEventListener('blur', () => {
        field.classList.remove('form__field_focused');
        if (field.value === "") {
            field.classList.remove('form__field_full');
        } else {
            field.classList.add('form__field_full');
        }
    });

    field.addEventListener('keyup', () => {
        hideStatuses();
        if (field.value === "") {
            showEmptyFieldPrompt(field);
        } else {
            showFullFieldPrompt(field);
            field.classList.remove('form__field_critical');
        }
    });
}

function hideStatuses() {
    hideStatusById('status_incorect');
    hideStatusById('status_invalid');
}

function showStatusById(id) {
    const status = document.getElementById(id);
    status.classList.remove('hide_element');
}
function hideStatusById(id) {
    const status = document.getElementById(id);
    status.classList.add('hide_element');
}

function showEmptyFieldPrompt(field) {
    field.classList.remove("form__field_full");
    showPromptBySelector(field, '.field_required');
}

function showFullFieldPrompt(field) {
    field.classList.add('form__field_full');
    field.classList.remove('form__field_critical');
    hidePromptBySelector(field, '.field_required');
    hidePromptBySelector(field, '#incorrect_email');
}

function showPromptBySelector(field, id) {
    const reqPrompt = field.parentElement.querySelector(id);
    reqPrompt.classList.remove("hide_element");
}
function hidePromptBySelector(field, id) {
    const reqPrompt = field.parentElement.querySelector(id);
    reqPrompt.classList.add("hide_element");
}

function toggleClick(e) {
    if (elemToggle.src.includes("/static/img/admin/eye-off.png")) {
        elemToggle.src = "../static/img/admin/eye.png";
        userPassword.setAttribute('type', 'password');
    } else {
        elemToggle.src = "../static/img/admin/eye-off.png";
        userPassword.setAttribute('type', 'text');
    }
}
