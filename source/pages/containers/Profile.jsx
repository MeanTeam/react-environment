import React, {Component} from 'react';
import {Link} from 'react-router';

class About extends Component {

    render() {
        return (
            <section name="Profile">
                <h1>User Profile</h1>
                <Link to="/">
                    Go to Home
                </Link>
                <Link to="/random">
                    Go to random
                </Link>
            </section>
        );
    }

}

export default About;