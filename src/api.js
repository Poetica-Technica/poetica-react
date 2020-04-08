import request from 'superagent';

// const URL='https://glacial-shelf-60937.herokuapp.com'
const URL='http://localhost:7890'

export async function createPoegram(author) {
    const response = await request
        .get(`${URL}/api/v1/create/old/?author=${author}`).withCredentials()
    return response.body;
}

export async function getMyPoegrams() {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await request
        .get(`${URL}/api/v1/users/poegrams`)
        .set('Authorization', user.token);
    return response.body;
}

export async function getAllPoegrams() {
    const response = await request
        .get(`${URL}/api/v1/poegrams`);
    return response.body;
}

export async function deletePoegrams(id) {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await request
    .delete(`${URL}/api/v1/poegrams/${id}`)
    .set('Authorization', user.token)
    return response.body;
}
