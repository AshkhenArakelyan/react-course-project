import React from 'react';

import postMockup from 'data-mockup/postMockup'

class Homepage extends React.Component {

    // componentDidMount() {
    //     fetch('https://react-course-project-5add1-default-rtdb.firebaseio.com/posts.json', {
    //         method: 'PUT',
    //         body: JSON.stringify(postMockup.map(el => ({...el, id: el.id-1 })))
    //     })
    //     .then(res => res.json())
    //     .then(resJson => console.log(resJson))
    // }
    render () {
        return (
            <h1>Homepage</h1>
        )
    }
}

export default Homepage;