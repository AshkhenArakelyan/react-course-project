class Service {
    constructor() {
        this.baseUrl = 'https://react-course-project-5add1-default-rtdb.firebaseio.com'
    }

    _request = (method, url, data = null) => {
        return fetch(`${this.baseUrl}${url}.json`, {
            method,
            headers: data ? {'Content-Type': 'application/json'} : {},
            body: data ? JSON.stringify(data) : null,
        })
        .then(res => {
            if(res.status < 400) {
                return res.json()
            } else {
                throw new Error('Network error')
            }
        })
    }

    getAllPosts = () => {
        return this._request('GET', '/posts')
    }
    getPosts = (start, limit = 12) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return resolve(this._request('GET', `/posts?_start=${start}&_limit=${limit}&_delay=3000`))
            }, 3000)
        })
    }
    getPost = (id) => {
        return this._request('GET', `/posts/${id}`)
    }
    createPost = (data) => {
        return this._request('POST', `/posts`, data)
    }
    updatePost = (id, data) => {
        return this._request('PATCH', `/posts/${id}`, data)
    }
    deletePost = (id) => {
        return this._request('DELETE', `/posts/${id}`)
    }
}

const service = new Service;

export default service;