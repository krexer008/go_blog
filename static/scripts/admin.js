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


    const formData = new Map([
        [keyTitle, ""],
        [keySubtitle, ""],
        [keyAuthorName, ""],
        [keyAuthorImage, ""],
        [keyPublishDate, ""],
        [keyLargeImage, ""],
        [keyShortImage, ""],
        [keyContent, ""],
    ])



    const titleField = this.document.getElementById(keyTitle);
    const subtitleField = this.document.getElementById(keySubtitle);
    const authorNameField = this.document.getElementById(keyAuthorName);/*
    const authorImageField = this.document.getElementById(keyAuthorImage);
    const dateField = this.document.getElementById(keyPublishDate);
    const largeImageField = this.document.getElementById(keyLargeImage);
    const shortImageField = this.document.getElementById(keyShortImage);
    const contentField = this.document.getElementById(keyContent);*/

    var validFieldsValid = true;

    fieldViewHandler(titleField);
    fieldViewHandler(subtitleField);
    fieldViewHandler(authorNameField);
    
    
    /*
    fieldViewHandler(dateField);
    
/*
    fieldKeyUpHandler(titleField);
    fieldKeyUpHandler(subtitleField);
    fieldKeyUpHandler(nameField);
    fieldKeyUpHandler(nameField);
*/


    function fieldViewHandler(input) {
        input.addEventListener('focus', fieldFocused);
        input.addEventListener('blur', fieldBlured);
    }

    function fieldFocused(e) {
        e.target.classList.remove('form__field_full');
        e.target.classList.remove('form__field_critical');
        e.target.classList.add('form__field_focused');
    }

    function fieldBlured(e) {
        e.target.classList.remove('form__field_focused');
        if (e.target.value === "") {
            e.target.classList.remove('form__field_full');
        } else {
            e.target.classList.add('form__field_full');
            this.alert('asd');
           /* formData.set(e.target.id, e.target.value);
            
            /*updatePreview();*/
        }
    }

    function updatePreview() {
        if (formData.get(keyTitle) !== "") {
            document.getElementById(previewPageTitle).textContent = formData.get(keyTitle);
            document.getElementById(previewPostCardTitle).textContent = formData.get(keyTitle);
        };
        if (formData.get(keySubtitle) !== "") {
            document.getElementById(previewPageSubitle).textContent = formData.get(keySubtitle);
            document.getElementById(previewPostCardSubtitle).textContent = formData.get(keySubtitle);
        };
        if (formData.get(keyAuthorName) !== "") {
            document.getElementById(previewAuthorName).textContent = formData.get(keyAuthorName);
        };
        if (formData.get(keyPublishDate) !== "") {
            document.getElementById(previewPublishDate).textContent = formData.get(keyPublishDate);
        };
        if (formData.get(keyContent) !== "") {
            document.getElementById(previewPublishDate).textContent = formData.get(keyContent);
        };
        /*
        
                [keyPublishDate, ""],
                    [keyLargeImage, ""],
                    [keyShortImage, ""],
                    [keyContent, ""],
        */
    }
    /*
        function fieldKeyUpHandler(e) {
            e.addEventListener('keyup', fieldKeyUp);
        }
    
        function fieldKeyUp(e) {
            const incorrectField = document.querySelector('#status-incorect');
            const needcheckField = document.querySelector('#status-need_check');
            incorrectField.target.classList.add('hide_element');
            needcheckField.target.classList.add('hide_element');
    
    
        }
    */

});