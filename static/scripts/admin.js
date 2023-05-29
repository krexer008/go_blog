"use strict";

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

const required = true;
const urequired = false;

const requiredField = new Map([
    [keyTitle, required],
    [keySubtitle, required],
    [keyAuthorName, required],
    [keyAuthorImage, required],
    [keyPublishDate, required],
    [keyLargeImage, required],
    [keyShortImage, required],
    [keyContent, required],
])

window.addEventListener('load', pageLoaded);

const titleField = this.document.getElementById(keyTitle);
const subtitleField = this.document.getElementById(keySubtitle);
const authorNameField = this.document.getElementById(keyAuthorName);
const authorImageField = this.document.getElementById(keyAuthorImage);
const dateField = this.document.getElementById(keyPublishDate);
const largeImageField = this.document.getElementById(keyLargeImage);
const shortImageField = this.document.getElementById(keyShortImage);
const contentField = this.document.getElementById(keyContent);

function pageLoaded(e) {

    let validFieldsValid = true;

    fieldTextHandler(titleField);
    fieldTextHandler(subtitleField);
    fieldTextHandler(authorNameField);
    fieldTextHandler(dateField);
    fieldTextHandler(contentField);


    /*
        fieldKeyUpHandler(titleField);
        fieldKeyUpHandler(subtitleField);
        fieldKeyUpHandler(nameField);
        fieldKeyUpHandler(nameField);
    */


    

};

function fieldTextHandler(input) {
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
    }
    formData.set(e.target.id, e.target.value);
    updatePreview(e);
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