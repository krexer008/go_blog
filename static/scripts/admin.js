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

    let validFieldsValid = true;

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
        input.addEventListener('blur', fieldBlurred);
    }

    function areaViewHandler(input) {
        input.addEventListener('focus', areaFocused);
        input.addEventListener('blur', areaBlurred);
    }

    function fieldFocused(e) {
        e.target.classList.remove('form__field_full');
        e.target.classList.add('form__field_focused');
    }

    function areaFocused(e) {
        e.target.classList.add('form__area_focus');
    }

    function fieldBlurred(e) {
        e.target.classList.remove('form__field_focused');
        if (e.target.value === "") {
            e.target.classList.remove('form__field_full');
        } else {
            e.target.classList.remove('form__field_critical');
            e.target.classList.add('form__field_full');
            formData.set(e.target.id, e.target.value);
            updatePreview(e);
        }
    }

    function areaBlurred(e) {
        e.target.classList.remove('form__area_focus');
        if (e.target.value !== "") {
            e.target.classList.remove('form__area_critical');
            formData.set(e.target.id, e.target.value);
        }
        console.log()
    }

    function updatePreview(e) {
        switch (e.target.id) {
            case keyTitle:
                console.log("Title Update");
                document.getElementById("previewPageTitle").textContent = formData.get(keyTitle);
                document.getElementById("previewPostCardTitle").textContent = formData.get(keyTitle);
                break;
            case keySubtitle:
                console.log("Subtitle Update");
                document.getElementById("previewPageSubtitle").textContent = formData.get(keySubtitle);
                document.getElementById("previewPostCardSubtitle").textContent = formData.get(keySubtitle);
                break;
            case keyAuthorName:
                console.log("AuthorName Update");
                document.getElementById("previewAuthorName").textContent = formData.get(keyAuthorName);
                break;
            case keyPublishDate:
                console.log("Date Update");
                document.getElementById("previewPublishDate").textContent = formData.get(keyPublishDate);
                break;
            case keyContent:
                console.log("Content Update");
                break;
        }
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