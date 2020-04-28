import request from 'superagent';

export const URL='https://radiant-gorge-25667.herokuapp.com'
// For use in local testing:
// export const URL='http://localhost:7890'

const resType = (format) => { 
    if (format === 'image') return 'blob'
    if (format === 'text' || format === 'imagepath') return 'text'
    return 'json'; 
}

export async function getAllAuthors() {
    const response = await request
        .get(`${URL}/api/v1/authors`);
    return response.body.authors;
}

export async function createPoegram(author, format) {
    const response = await request
        .get(`${URL}/api/v1/create/?author=${author}&format=${format}`)
        .responseType(resType(format))
        .withCredentials();
    if (format === 'text' || format === 'imagepath') return response.text;
    else return response.body;
}

export async function getMyPoegrams() {
    const response = await request
        .get(`${URL}/api/v1/poegrams/mine`)
        .withCredentials();
    return response.body;
}

export async function getAllPoegrams() {
    const response = await request
        .get(`${URL}/api/v1/poegrams`);
    return response.body;
}

export async function getRandomPoegram(format) {

    // // Fetch method alternative to Superagent for image
    //
    // fetch('http://localhost:7890/api/v1/poegrams/random/?format=image', {
    //   method: 'GET',
    //   // headers: {
    //   //   'Accept': 'application/json',
    //   //   'Content-Type': 'application/json',
    //   // },
    // })
    // .then((response) => {
    //   console.log('Response: ', response);
    //   return response.url;
    // })
    // .then((data) => {
    //   console.log('Data: ', data );
    //   const imageUrl = URL.createObjectURL(data);
    //   this.setState({ data: data, sentFormat: this.state.viewRandomFormat })
    // })

    const response = await request
        .get(`${URL}/api/v1/poegrams/random/?format=${format}`)
        .responseType(resType(format));
    if (format === 'text' || format === 'imagepath') return response.text;
    else return response.body;
}

export async function deletePoegram(id) {
    const response = await request
    .delete(`${URL}/api/v1/poegrams/${id}`).withCredentials()
    return response.body;
}

