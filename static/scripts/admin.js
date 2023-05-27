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
    const authorNameField = this.document.getElementById(keyAuthorName);
/*
    const dateField = this.document.getElementById(keyPublishDate);
*/  
    const contentField = this.document.getElementById(keyContent);
    /*
    const authorImageField = this.document.getElementById(keyAuthorImage);
    
    const largeImageField = this.document.getElementById(keyLargeImage);
    const shortImageField = this.document.getElementById(keyShortImage);
    
    */

    var validFieldsValid = true;

    fieldViewHandler(titleField);
    fieldViewHandler(subtitleField);
    fieldViewHandler(authorNameField);
    areaViewHandler(contentField);

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

    function areaViewHandler(input) {
        input.addEventListener('focus', areaFocused);
        input.addEventListener('blur', areaBlured);
    }

    function fieldFocused(e) {
        e.target.classList.remove('form__field_full');
        e.target.classList.remove('form__field_critical');
        e.target.classList.add('form__field_focused');
    }

    function areaFocused(e) {
        e.target.classList.remove('form__area_critical');
        e.target.classList.add('form__area_focus');
    }



    function fieldBlured(e) {
        e.target.classList.remove('form__field_focused');
        if (e.target.value == "") {
            e.target.classList.remove('form__field_full');
        } else {
            e.target.classList.add('form__field_full');
            formData.set(e.target.id, e.target.value);
            updatePreview();
        };
    }


    function areaBlured(e) {
        e.target.classList.remove('form__area_focus');
        if (e.target.value == "") {
            e.target.classList.remove('form__field_full');
        } else {
            formData.set(e.target.id, e.target.value);
            updatePreview();
        };
    }

    function updatePreview(e) {
        if (formData.get(keyTitle) != "") {
            console.log("Title Update");
            document.getElementById("previewPageTitle").textContent = formData.get(keyTitle);
            document.getElementById("previewPostCardTitle").textContent = formData.get(keyTitle);
        };

        if (formData.get(keySubtitle) != "") {
            console.log("Subtitle Update");
            document.getElementById("previewPageSubtitle").textContent = formData.get(keySubtitle);
            document.getElementById("previewPostCardSubtitle").textContent = formData.get(keySubtitle);
        };
        if (formData.get(keyAuthorName) != "") {
            console.log("AuthorName Update");
            document.getElementById("previewAuthorName").textContent = formData.get(keyAuthorName);
        };
        /*
        if (formData.get(keyPublishDate) != "") {
            console.log("Subtitle Update");
            document.getElementById("previewPublishDate").textContent = formData.get(keyPublishDate);
        };
        */
        if (formData.get(keyContent) != "") {
            console.log("Subtitle Update");
            document.getElementById("previewPublishDate").textContent = formData.get(keyContent);
        };

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