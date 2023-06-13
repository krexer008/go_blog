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
    [keyAuthorName, required],
    [keyAuthorImage, unRequired],
    [keyPublishDate, required],
    [keyLargeImage, required],
    [keyShortImage, unRequired],
    [keyContent, required],
])

const maxAvatarSize = 1 * 1024 * 1024;
const maxLargeImageSize = 10 * 1024 * 1024;
const maxShortImageSize = 5 * 1024 * 1024;

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
    /*
        const exit = document.querySelector('#logout');
        exit.addEventListener('click', logOut);
    */
    /*
        const logo = document.querySelector('#logo');
        logo.addEventListener('click', goHome);
    */
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

    let eventFocus = new Event('focus');
    titleField.dispatchEvent(eventFocus);

    const publishButton = document.querySelector('#publishButton');
    publishButton.addEventListener('click', sendForm);
};
/*
function goHome(e) {
    window.location.href = '/home';
}
*/
/*
function logOut(e) {
    const response = await fetch('/logout');
    if (response.ok) {
        window.location.href = response.url;
    }
}
*/
async function sendForm(event) {
    event.preventDefault();
    let errors = formValidate();
    if (errors) {
        showErrorBar();
    } else {
        hideErrorBar();
        let date = new Date(dataMap.get(keyPublishDate)); // получить дату
        let dateString = date.toLocaleDateString('en-US'); // записать в строку по стандарту

        let jsonData = {
            Title: dataMap.get(keyTitle),
            Subtitle: dataMap.get(keySubtitle),
            AuthorName: dataMap.get(keyAuthorName),
            AuthorImage: dataMap.get(keyAuthorImage),
            AuthorImageName: (dataMap.get(keyAuthorImage) === "") ? "keyAuthorImage".toLowerCase : authorImageField.files[0].name,
            PublishDate: dateString,
            LargeImage: dataMap.get(keyLargeImage),
            LargeImageName: (dataMap.get(keyLargeImage) === "") ? "keyLargeImage".toLowerCase : largeImageField.files[0].name,
            ShortImage: dataMap.get(keyShortImage),
            ShortImageName: (dataMap.get(keyShortImage) === "") ? "keyShortImage".toLowerCase : shortImageField.files[0].name,
            Content: dataMap.get(keyContent)
        }
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify(jsonData)
        });

        if (response.ok) {
            showSuccessBar();
        } else {
            showErrorBar();
        }
    }
}

function formValidate() {
    let errors = 0;
    let eventChange = new Event('change');
    let eventKeyUp = new Event('keyup');
    requiredMap.forEach(fieldValidate);    
    return errors;
}

function fieldValidate(required, key) {
    if (required) {
        if (dataMap.get(key) === "") {
            const field = document.getElementById(key);
            errors++;
            const formRequired = field.parentElement.querySelector('.form__required');
            formRequired.classList.add('form__required_critical');
            if (field.classList.contains('form__area')) {
                field.classList.add('form__area_critical');
            } else {
                field.classList.add('form__field_critical');
            }
        }
    }
}


function showSuccessBar() {
    let successBar = document.querySelector('.status__success');
    successBar.classList.add('status__visibility');
    hideErrorBar();
}

function showErrorBar() {
    let errorBar = document.querySelector('.status__error');
    errorBar.classList.add('status__visibility');
    hideSuccessBar();
}

function hideSuccessBar() {
    let successBar = document.querySelector('.status__success');
    successBar.classList.remove('status__visibility');
}

function hideErrorBar() {
    let errorBar = document.querySelector('.status__error');
    errorBar.classList.remove('status__visibility');
}

function fieldFileHandler(field, limit, previewElements, key) {
    let required = requiredMap.get(key);

    const removeButton = field.parentElement.querySelector('.remove__button');
    removeButton.addEventListener('click', () => {
        field.value = "";
        dataMap.set(key, "");
        let eventChange = new Event('change');
        field.dispatchEvent(eventChange);
    });

    field.addEventListener('change', () => {
        let file = field.files[0];
        if (field.value === "") {
            if (required) {
                showEmptyFileFieldPrompt(field);
            }
            if (dataMap.get(key) === "") {
                hideMenu(field);
                hideLimitError(field);
            }
            updateImagePreviews(previewElements, dataMap.get(key));
        } else {
            if (field.files[0].size > limit) {
                if (required) {
                    showEmptyFileFieldPrompt(field);
                }
                showLimitError(field);
                if (dataMap.get(key) === "") {
                    hideMenu(field);
                }
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
                showCompleteFileFieldPrompt(field);
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
    const formImage = field.parentElement.querySelector('.form__preview');
    formImage.classList.add('image-field_empty');
}

function showCompleteFileFieldPrompt(field) {
    hideLimit(field);
    const formImage = field.parentElement.querySelector('.form__preview');
    formImage.classList.remove('image-field_empty');
}

function showLimitError(field) {
    showLimit(field);
    const reqPrompt = field.parentElement.querySelector('.form__required');
    reqPrompt.classList.add('form__required_critical');
}

function hideLimitError(field) {
    showLimit(field);
    const reqPrompt = field.parentElement.querySelector('.form__required');
    reqPrompt.classList.remove('form__required_critical');
}

function showLimit(field) {
    const reqPrompt = field.parentElement.querySelector('.form__required');
    reqPrompt.classList.remove('hide_element');
}

function hideLimit(field) {
    const reqPrompt = field.parentElement.querySelector('.form__required');
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

function fieldTextHandler(field, previewElements, key) {
    let required = requiredMap.get(key);

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
                field.classList.remove('form__field_critical');

            }
            updatePreviews(previewElements, field.value);
        }
    });
}

function areaTextHandler(field, key) {
    let required = requiredMap.get(key);

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
                field.classList.remove('form__area_critical');
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