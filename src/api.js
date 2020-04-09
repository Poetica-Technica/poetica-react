import request from 'superagent';

// const URL='https://glacial-shelf-60937.herokuapp.com'
const URL='http://localhost:7890'

export async function createPoegram(author) {
    const response = await request
        .get(`${URL}/api/v1/create/?author=${author}`).withCredentials()
    return response.body;
}

export async function getMyPoegrams() {
    const response = await request
        .get(`${URL}/api/v1/users/poegrams`).withCredentials()
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
