"use strict";

window.addEventListener('DOMContentLoaded', function () {

    const form = this.document.querySelector('#form');
    const elemToggle = this.document.querySelector('#toggle');
    const elemEmail = this.document.getElementById('input_email');
    const elemPasword = this.document.querySelector('#input_password');
    const elemButton = this.document.querySelector('#submitButton');

    elemToggle.addEventListener('click', toggleClick);
    fieldViewdHandler(elemEmail);
    fieldViewdHandler(elemPasword);

    fieldKeyUpHandler(elemEmail);+
    fieldKeyUpHandler(elemPasword);

    form.addEventListener("submit", alert('Hi send'));


    function fieldKeyUpHandler(e) {
        e.addEventListener('keyup', fieldKeyUp);
    }

    function fieldKeyUp(e) {
        const incorrectField = document.querySelector('#status-incorect');
        const needcheckField = document.querySelector('#status-need_check');
        incorrectField.target.classList.add('hide_element');
        needcheckField.target.classList.add('hide_element');

        const formRequired = e.target


    }

    function fieldViewdHandler(input) {
        input.addEventListener('focus', fieldFocused);
        input.addEventListener('blur', fieldBlured);
    }

    function fieldFocused(e) {
        e.target.classList.remove('form__field_full');
        e.target.classList.add('form__field_focused');
    }

    function fieldBlured(e) {
        e.target.classList.remove('form__field_focused');
        if (e.target.value == "") {
            e.target.classList.remove('form__field_full');
        } else {
            e.target.classList.add('form__field_full');
        }
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




});