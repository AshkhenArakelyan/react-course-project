import React from 'react';

import './Homepage.scss';

class Homepage extends React.Component {
    render () {
        return (
            <div className="app-homepage" >
                <div className="app-homepage__welcome-text">
                    <h1 className="app-homepage__welcome-text__welcome">Welcome</h1>
                    <h2 className="app-homepage__welcome-text__site-description">In this page you can create your own blog and to do list</h2>
                </div>
                
            </div>
        )
    }
}

export default Homepage;