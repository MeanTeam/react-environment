import React from 'react';
import {
    Match,
    Miss,
    Link,
} from 'react-router';


import Home from './Home.jsx';
import Post from './Post.jsx';
import Error404 from './Error404.jsx';
import Profile from './Profile.jsx';

let Pages = () => {
    return (
        <main role="application">
            {/*Home page*/}
            <Match
                pattern="/"
                exactly
                component={Home}
            />
            {/*Post*/}
            <Match
                pattern="/post/:id"
                exactly
                component={Post}
            />
            {/*User profile*/}
            <Match
                pattern="/user/:id"
                exactly
                component={Profile}
            />
            {/* Error 404 */}
            <Miss component={Error404}/>
        </main>
    );
};

export default Pages;