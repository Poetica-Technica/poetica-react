import request from 'superagent';

const URL='https://poegram.herokuapp.com'
// const URL='http://localhost:7890'

export async function getAllAuthors() {
    const response = await request
        .get(`http://localhost:7890/api/v1/authors`);
    return response.body.authors;
}

export async function createPoegram(author, format) {
    const response = await request
        .get(`${URL}/api/v1/create/?author=${author}&format=${format}`).withCredentials()
    console.log(`request: ${URL}/api/v1/create/?author=${author}&format=${format}`)
    console.log(`response:`, response);
    if (format === 'text' || format === 'imagepath') return response.text;
    else { console.log('returning format is', format); return response.body; }
}

export async function getMyPoegrams() {
    const response = await request
        .get(`${URL}/api/v1/poegrams/mine`).withCredentials()
    return response.body;
}

export async function getAllPoegrams() {
    const response = await request
        .get(`${URL}/api/v1/poegrams`);
    return response.body;
}

export async function deletePoegrams(id) {
    const response = await request
    .delete(`${URL}/api/v1/poegrams/${id}`).withCredentials()
    return response.body;
}
