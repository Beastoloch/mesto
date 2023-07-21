export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getInitialCards(){
        return fetch(`${this._baseUrl}/cards`,
            {headers: this._headers})
            .then((response) => {
                if(response.ok)
                    return response.json().then((data) => {
                        return data.reverse();
                    }).catch((err) => {
                    console.log(err);
                })
            });
    }

    getUserInfo(){
        return fetch(`${this._baseUrl}/users/me`,
            {headers: this._headers})
            .then((response) => {
                if(response.ok)
                    return response.json().then((data) => {
                        return data;
                    }).catch((err) => {
                    console.log(err);
                })
            });
    }

    postNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then((response) => {
                if(response.ok)
                    return response.json().then((data) => {
                        return data;
                    }).catch((err) => {
                        console.log(err);
                    })
            });
    }

    setUserInfo(name, info){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: info
            })
        })
            .then((response) => {
                if(response.ok)
                    return response.json().then((data) => {
                        return data;
                    }).catch((err) => {
                    console.log(err);
                })
            });
    }

    setUserAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link,
            })
        })
            .then((response) => {
                if(response.ok)
                    return response.json().then((data) => {
                        return data;
                    }).catch((err) => {
                    console.log(err);
                })
            });
    }

    putLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then((response) => {
                if(response.ok)
                    return response.json().then((data) => {
                        return data;
                    }).catch((err) => {
                        console.log(err);
                    })
            });
    }

    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then((response) => {
                if(response.ok)
                    return response.json().then((data) => {
                        return data;
                    }).catch((err) => {
                        console.log(err);
                    })
            });
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then((response) => {
                if(response.ok)
                    return response.json().then((data) => {
                        return data;
                    }).catch((err) => {
                        console.log(err);
                    })
            });
    }
}