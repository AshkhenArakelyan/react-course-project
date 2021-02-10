const  requestData = (method, url, data = null) => {
    return fetch(url, {
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
};

const getAllPosts = () => {
    return requestData('GET', 'https://jsonplaceholder.typicode.com/posts')
}

export { getAllPosts };