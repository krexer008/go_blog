"use strict";

window.addEventListener('load', pageLoaded);

const form = this.document.querySelector('#form');
const userEmail = this.document.querySelector('#input_email');
const userPasword = this.document.querySelector('#input_password');
const elemToggle = this.document.querySelector('#toggle');
const elemButton = this.document.querySelector('#submitButton');

function pageLoaded(e) {
    fieldTextHandler(userEmail);
    //fieldTextHandler(userPasword);

    elemToggle.addEventListener('click', toggleClick);

    //form.addEventListener("submit", senForm);
}

function fieldTextHandler(field) {

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
            field.classList.remove('form__field_critical');


        }
    });
}

function toggleClick(e) {
    if (elemToggle.src.includes("/static/img/admin/eye-off.png")) {
        elemToggle.src = "../static/img/admin/eye.png";
        elemPasword.setAttribute('type', 'password');
    } else {
        elemToggle.src = "../static/img/admin/eye-off.png";
        elemPasword.setAttribute('type', 'text');
    }
}