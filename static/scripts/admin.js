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
    [keyAuthorImage, required],
    [keyPublishDate, required],
    [keyLargeImage, required],
    [keyShortImage, required],
    [keyContent, required],
])

const maxAvatarSize = 1 * 1024 * 1024;
const maxShortImageSize = 10 * 1024 * 1024;
const maxLargeImageSize = 5 * 1024 * 1024;

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

    const datePreview = document.querySelectorAll('.preview__date');
    fieldTextHandler(dateField, datePreview, keyPublishDate);

    areaTextHandler(contentField, keyContent);

    const authorImagePreviews = document.querySelectorAll('.author-avatar');
    fieldFileHandler(authorImageField, maxAvatarSize, authorImagePreviews, keyAuthorImage);

    const postImagePreviews = document.querySelectorAll('.post-image');
    fieldFileHandler(largeImageField, maxLargeImageSize, postImagePreviews, keyLargeImage);

    const cardImagePreviews = document.querySelectorAll('.card-image');
    fieldFileHandler(shortImageField, maxShortImageSize, cardImagePreviews, keyShortImage);
};

function fieldFileHandler(field, limit, previewElements, key) {
    let required = requiredMap.get(key);

    const removeButton = field.parentElement.querySelector('.remove__button');
    removeButton.addEventListener('click', () => {
        field.value = "";
        let eventChange = new Event('change');
        field.dispatchEvent(eventChange);
    });

    field.addEventListener('change', () => {

        let file = field.files[0];
        

        if (field.value === "") {
            dataMap.set(key, "");
            if (required) {
                showEmptyFileFieldPrompt(field);
            }
            hideMenu(field);
            hideLimitError(field);
            let imageBase64 = "";
            updateImagePreviews(previewElements, dataMap.get(key));
        } else {
            if (field.files[0].size > limit) {
                if (required) {
                    showEmptyFileFieldPrompt(field);
                }
                showLimitError(field);
                showMenu(field);
            } else {     
                let reader = new FileReader();                
                reader.onloadend = () => {
                    let imageBase64 = reader.result;
                    dataMap.set(key, imageBase64);
                    showMenu(field);
                    updateImagePreviews(previewElements, dataMap.get(key));
                }
                reader.onerror = (e) => {
                    console.log("Error in event: " + e);
                    alert("File reading error!");
                }
                reader.readAsDataURL(file);
                if (required) {
                    showCompleteFileFieldPrompt(field);
                }
                hideLimitError(field);
                hideLimit(field);
            }
        }
    });
}

function hideMenu(field) {
    const formMenu = field.parentElement.querySelector('.form__menu');
    formMenu.classList.add("hide_element");
    showUpload(field);
}
function showMenu(field) {
    const formMenu = field.parentElement.querySelector('.form__menu');
    formMenu.classList.remove("hide_element");
    hideUpload(field);
}

function showUpload(field) {
    const uploadButton = field.parentElement.querySelector('.upload');
    uploadButton.classList.remove("hide_element");
}

function hideUpload(field) {
    const uploadButton = field.parentElement.querySelector('.upload');
    uploadButton.classList.add("hide_element");
}

function showEmptyFileFieldPrompt(field) {
    //const reqPrompt = field.parentElement.querySelector('.form__required');
    //reqPrompt.classList.remove('hide_element');
    const formImage = field.parentElement.querySelector('.form__preview');
    formImage.classList.add('image-field_empty');
}

function showCompleteFileFieldPrompt(field) {
    //const reqPrompt = field.parentElement.querySelector('.form__required');
    //reqPrompt.classList.add('hide_element');
    const formImage = field.parentElement.querySelector('.form__preview');
    formImage.classList.remove(image - field_empty);
}

function showLimitError(field) {
    showLimit(field);
    const reqPrompt = field.parentElement.querySelector('.form__limit');
    reqPrompt.classList.add('form__limit_critical');
}

function hideLimitError(field) {
    showLimit(field);
    const reqPrompt = field.parentElement.querySelector('.form__limit');
    reqPrompt.classList.remove('form__limit_critical');
}

function showLimit(field) {
    const reqPrompt = field.parentElement.querySelector('.form__limit');
    reqPrompt.classList.remove('hide_element');
}

function hideLimit(field) {
    const reqPrompt = field.parentElement.querySelector('.form__limit');
    reqPrompt.classList.add('hide_element');
}


function updateImagePreviews(previewElements, content) {
    for (const previewElement of previewElements) {
        previewElement.src = content;
        if (content === "") {
            previewElement.classList.add('hide_element');
        }
        else {
            previewElement.classList.remove('hide_element');
        }
    }
}

/*
function showEmptyFileField(field) {
    const reqPrompt = field.parentElement.querySelector('.form__required');
    const formmPreview = field.parentElement.querySelector('.');
    reqPrompt.classList.remove("hide_element");
    field.classList.remove("form__field_full");
}
*/
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