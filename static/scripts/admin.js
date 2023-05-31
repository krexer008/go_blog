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

    const dataPreview = document.querySelector('.preview__date');
    fieldTextHandler(dateField, dataPreview, keyPublishDate);

    areaTextHandler(contentField, keyContent);

    const authorImagePreviews = document.querySelectorAll('.author-avatar');
    fieldFileHandler(authorImageField, authorImagePreview, keyAuthorImage);

    fieldFileHandler(largeImageField);

    fieldFileHandler(shortImageField);
};


function fieldFileHandler(field, previewElements, key){
    let required = requiredMap.get(key);
const fieldUplod = field.parentElement.querySelector('');

}



function fieldTextHandler(field, previewElements, key) {
    let required = requiredMap.get(key);


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
            if (required) {
                showEmptyFieldPrompt(field);
            }
            let emptyString = "Enter " + field.parentElement
            .querySelector('.form__description').textContent;
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

    field.addEventListener('mouseover', () => {
        field.classList.add('form__area_hover');
    });

    field.addEventListener('mouseout', () => {
        field.classList.remove('form__area_hover');
    });

    field.addEventListener('focus', () => {
        field.classList.add('form__area_focused');
    });

    field.addEventListener('blur', () => {
        field.classList.remove('form__area_focused');
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