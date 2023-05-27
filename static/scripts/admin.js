"use strict";

window.addEventListener('DOMContentLoaded', function () {

    const form = this.document.querySelector('#form');
    const titleField = this.document.querySelector('#title');
    const subtitleField = this.document.querySelector('#subtitle');
    const nameField = this.document.querySelector('#name');
    const dateField = this.document.querySelector('#date');

    fieldViewHandler(titleField);
    fieldViewHandler(subtitleField);
    fieldViewHandler(nameField);
    fieldViewHandler(dateField);

    fieldKeyUpHandler(titleField);
    fieldKeyUpHandler(subtitleField);
    fieldKeyUpHandler(nameField);
    fieldKeyUpHandler(nameField);

    
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

    function fieldViewHandler(input) {
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

});