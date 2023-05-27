"use strict";

window.addEventListener('DOMContentLoaded', function () {

    const form = this.document.querySelector('#form');

    const keyTitle = "Title";
    const keySubtitle = "Subtitle";
    const keyAuthorName = "AuthorName";
    const keyAuthorImage = "AuthorImage";
    const keyPublishDate = "PublishDate";
    const keyLargeImage = "LargeImage";
    const keyShortImage = "ShortImage";
    const keyContent = "Content";



    const titleField = this.document.getElementById(keyTitle);
    const subtitleField = this.document.getElementById(keySubtitle);
    const authorNameField = this.document.getElementById(keyAuthorName);
    const authorImageField = this.document.getElementById(keyAuthorImage);
    const dateField = this.document.getElementById(keyPublishDate);
    const largeImageField = this.document.getElementById(keyLargeImage);
    const shortImageField = this.document.getElementById(keyShortImage);
    const contentField = this.document.getElementById(keyContent);

    var validValid = true;

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
            e.target.classList.
        } else {
            e.target.classList.add('form__field_full');
        }
    }

});