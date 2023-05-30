"use strict";

const keyTitle = "Title";
const keySubtitle = "Subtitle";
const keyAuthorName = "AuthorName";
const keyAuthorImage = "AuthorImage";
const keyPublishDate = "PublishDate";
const keyLargeImage = "LargeImage";
const keyShortImage = "ShortImage";
const keyContent = "Content";

const dataMap = new Map([
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
const unRequired = false;

const requiredsMap = new Map([
    [keyTitle, required],
    [keySubtitle, required],
    [keyAuthorName, unRequired],
    [keyAuthorImage, unRequired],
    [keyPublishDate, unRequired],
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

    const previewTitle = document.getElementsByClassName('preview__title');
    fieldTextHandler(titleField, previewTitle, keyTitle);


    fieldTextHandler(subtitleField);
    fieldTextHandler(authorNameField);
    fieldTextHandler(dateField);
    fieldTextHandler(contentField);

    fieldFileHandler(authorImageField);
    fieldFileHandler(largeImageField);
    fieldFileHandler(shortImageField);
};

function fieldTextHandler(field, previews, key) {
    let required = requiredsMap.get(key);

    field.addEventListener('focus', () => {
        e.target.classList.remove('form__field_full');
        e.target.classList.add('form__field_focused');
    });

    field.addEventListener('blur', () => {
        e.target.classList.remove('form__field_focused');
        if (e.target.value === "") {
            e.target.classList.remove('form__field_full');
        } else {
            e.target.classList.add('form__field_full');
        }
    });

    field.addEventListener('keyup', () => {
        if (field.value === "") {
            dataMap.set(key, field.value);
            if (required) {
                indicateFieldTextEmpty(field);
            }
            
        }
    });
}


function indicateFieldTextEmpty(field){
    const reqPrompt = field.parentElement.querySelector('.form__required');
    reqPrompt.classList.remove("hide_element");
    field.classList.remove("form__field_full");
    field.classList.remove("form__field_focused");

}





function areaViewHandler(input) {
    input.addEventListener('focus', areaFocused);
    input.addEventListener('blur', areaBlurred);
}


function areaFocused(e) {
    e.target.classList.add('form__area_focus');
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