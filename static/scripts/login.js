"use strict";

const keyEmail = "Email";
const keyPassword = "Password";

const dataMap = new Map([
    [keyEmail, ""],
    [keyPassword, ""],
])

window.addEventListener('load', pageLoaded);

const form = this.document.querySelector('#form');
const userEmail = this.document.getElementById(keyEmail);
const userPassword = this.document.getElementById(keyPassword);
const elemButton = this.document.getElementById('submitButton');
const elemToggle = this.document.getElementById('toggle');

function pageLoaded(e) {


    fieldTextHandler(userEmail, keyEmail);

    fieldTextHandler(userPassword, keyPassword);

    //button.addEventListener("click", senForm);

    elemToggle.addEventListener('click', toggleClick);
}

function fieldTextHandler(field, key) {

    field.addEventListener('mouseover', () => {
        field.classList.add('form__field_hover');
    });

    field.addEventListener('mouseout', () => {
        field.classList.remove('form__field_hover');
    });

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
        if (field.value === "") {
            dataMap.set(key, "");
            showEmptyFieldPrompt(field);
        } else {
            dataMap.set(key, field.value);
            showFullFieldPrompt(field);
        }
    });
}

function showEmptyFieldPrompt(field) {
    const reqPrompt = field.parentElement.querySelector('.form__required');
    reqPrompt.classList.remove("hide_element");
    field.classList.remove("form__field_full");
}

function showFullFieldPrompt(field) {
    field.classList.add('form__field_full');
    field.classList.remove('form__field_critical');
    const reqPrompt = field.parentElement.querySelector('.form__required');
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
