const url = 'http://localhost:3000';


/**
 * Constructor for an exception object
 * @param {string} msg String with the error message of the HTTP request
 */
 function ResponseException(msg) {
    this.msg = msg;
}

async function loadAllMemes() {
    const response = await fetch(url + '/api/memes');
    if (!response.ok) {
        throw new ResponseException(response.status + " " + response.statusText);
    }
    const memes = await response.json();
    return memes.map(m => {
        m = ({ ...m, sentences: m.sentences.split('&&&&&'), url: url + m.url, prot: (Boolean(m.protected)) , creatorName: m.name, cssSentencesPosition: m.cssSentencesPosition.split(",")});
        delete m.protected;
        delete m.name;
        return m;
    });
}

async function addNewMeme(newMeme) {
    await fetch(url + '/api/memes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: newMeme.title,
            imageId: newMeme.imageId,
            sentences: newMeme.sentences,
            cssFontClass: newMeme.cssFontClass,
            cssColourClass: newMeme.cssColourClass,
            prot: newMeme.prot
        })
    });
}


async function loadImages() {
    const response = await fetch(url + '/api/images');
    if (!response.ok) {
        throw new ResponseException(response.status + " " + response.statusText);
    }
    const images = await response.json();
    return images.map(i => {
        i = ({ ...i, url: url + i.url, cssSentencesPosition: i.cssSentencesPosition.split(",")});
        return i;
    });
}

async function loadPublicMemes() {
    const response = await fetch(url + '/api/memes/filter=public');
    if (!response.ok) {
        throw new ResponseException(response.status + " " + response.statusText);
    }
    const pubmemes = await response.json();
    return pubmemes.map(m => {
        m = ({ ...m, sentences: m.sentences.split('&&&&&'), url: url + m.url, prot: (Boolean(m.protected)) , creatorName: m.name, cssSentencesPosition: m.cssSentencesPosition.split(",")});
        delete m.protected;
        delete m.name;
        return m;
    });
}

async function deleteMeme(idMeme) {
    await fetch(url + '/api/memes/' + idMeme, {
        method: 'DELETE'
    });
}

/**
 * Function that performs the login through a POST request to the server
 * @param {object} credentials object with username and password of the user that wants to log in 
 * @returns an object with the user name and the user id
 */
async function logIn(credentials) {
    let response = await fetch(url + '/api/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    console.log(response)
    if (response.ok) {
        const user = await response.json();
        return { name: user.name, id: user.id };
    }
    else {
        try {
            const errDetail = await response.json();
            throw errDetail.message;
        }
        catch (err) {
            throw err;
        }
    }
}

/**
 * Function that performs the logout through a DELETE request to the server
 */
async function logOut() {
    await fetch(url + '/api/sessions/current', { method: 'DELETE' });
}

/**
 * Function that checks wheather a user is logged in or not through a GET request to the server
 * @returns an object with the user info (id, username, name)
 */
async function getUserInfo() {
    const response = await fetch(url + '/api/sessions/current');
    const userInfo = await response.json();
    if (response.ok) {
        return userInfo;
    } else {
        throw userInfo;  // an object with the error coming from the server
    }
}



const API = { logIn, logOut, getUserInfo, loadPublicMemes, deleteMeme, loadAllMemes, loadImages, addNewMeme }

export default API;