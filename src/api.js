import request from 'superagent';

const URL='https://serene-springs-71594.herokuapp.com/api/'

// Calls server API to translate original_text
export async function getTranslation(original_text) {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await request
        .get(`${URL}translations?text=${encodeURIComponent(original_text)}`)
        .set('Authorization', user.token);
    return response;
}

export async function getTags() {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await request
        .get(`${URL}tags`)
        .set('Authorization', user.token);
    return response;
}

// Saves and tags thing
export async function saveTranslation(original_text, translated, tag) {
    const translation = {
        original_text: original_text,
        translated: translated,
        tag: tag
    };
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await request
        .post(`${URL}translations`, translation)
        .set('Authorization', user.token);
    return response;
}

export async function getTranslations(user_id, tag_id) {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await request
    .get(`${URL}translations/search`)
    .set('Authorization', user.token);

    return response;
}

export async function searchTranslations(user_id, tag_id) {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await request
    .get(`${URL}translations/search/${user_id}/${tag_id}`)
    .set('Authorization', user.token);

    return response;
}

export async function deleteTranslation(id) {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await request
    .get(`${URL}translations/chair/${id}`)
    .set('Authorization', user.token)

    return response;
}
