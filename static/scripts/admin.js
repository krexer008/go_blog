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

const requiredMap = new Map([
    [keyTitle, required],
    [keySubtitle, required],
    [keyAuthorName, unRequired],
    [keyAuthorImage, unRequired],
    [keyPublishDate, required],
    [keyLargeImage, required],
    [keyShortImage, required],
    [keyContent, required],
])

window.addEventListener('load', pageLoaded);

const titleField = document.getElementById(keyTitle);
const subtitleField = document.getElementById(keySubtitle);
const authorNameField = document.getElementById(keyAuthorName);
const authorImageField = document.getElementById(keyAuthorImage);
const dateField = document.getElementById(keyPublishDate);
const largeImageField = document.getElementById(keyLargeImage);
const shortImageField = document.getElementById(keyShortImage);
const contentField = document.getElementById(keyContent);

function pageLoaded(e) {

    const titlePreviews = document.querySelectorAll('.preview__title');
    fieldTextHandler(titleField, titlePreviews, keyTitle);

    const subtitlePreviews = document.querySelectorAll('.preview__subtitle');
    fieldTextHandler(subtitleField, subtitlePreviews, keySubtitle);

    const authorNamePreview = document.querySelectorAll('.preview__authorname');
    fieldTextHandler(authorNameField, authorNamePreview, keyAuthorName);

    const dataPreview = document.querySelectorAll('.preview__date');
    fieldTextHandler(dateField, dataPreview, keyPublishDate);

    areaTextHandler(contentField, keyContent);


    fieldFileHandler(authorImageField);
    fieldFileHandler(largeImageField);
    fieldFileHandler(shortImageField);
};

function fieldTextHandler(field, previewElements, key) {
    let required = requiredMap.get(key);

    field.addEventListener('focus', () => {
        field.target.classList.remove('form__field_full');
        field.target.classList.add('form__field_focused');
    });

    field.addEventListener('blur', () => {
        field.target.classList.remove('form__field_focused');
        if (field.target.value === "") {
            field.target.classList.remove('form__field_full');
        } else {
            field.target.classList.add('form__field_full');
        }
    });

    field.addEventListener('keyup', () => {
        if (field.value === "") {
            dataMap.set(key, "");
            if (required) {
                showEmptyFieldPrompt(field);
            }
            let emptyString = "Please, enter " + field.parentElement.querySelector('.form__description').textContent.toLowerCase;
            updatePreviews(previewElements, emptyString);
        } else {
            dataMap.set(key, field.value);
            if (required) {
                showFullFieldPrompt(field);
            }
            updatePreviews(previewElements, field.value);
        }
    });
}


function areaTextHandler(field, key) {
    let required = requiredMap.get(key);

    field.addEventListener('focus', () => {
        field.target.classList.add('form__area_focused');
    });

    field.addEventListener('blur', () => {
        field.target.classList.remove('form__area_focused');
    });

    field.addEventListener('keyup', () => {
        if (field.value === "") {
            dataMap.set(key, field.value);
            if (required) {
                showEmptyFieldPrompt(field);
            }
        } else {
            dataMap.set(key, field.value);
            if (required) {
                showFullFieldPrompt(field);
            }
        }
    });
}




function showEmptyFieldPrompt(field) {
    const reqPrompt = field.parentElement.querySelector('.form__required');
    reqPrompt.classList.remove("hide_element");
    field.classList.remove("form__field_full");
    field.classList.remove("form__field_focused");
}

function showFullFieldPrompt(field) {
    const reqPrompt = field.parentElement.querySelector('.form__required');
    reqPrompt.classList.add("hide_element");
}

function updatePreviews(previewElements, contentString) {
    for (const previewElement of previewElements) {
        previewElement.textContent = contentString;
    }
}