import React, {Component} from 'react';
import {Link} from 'react-router';

import api from '../../api';
import Post from '../../posts/containers/Post.jsx';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            posts: [],
            loading: false,
        };
    }

    async componentDidMount() {
        const posts = await api.posts.getList(this.state.page);

        this.setState({
            posts,
            page: this.state.page + 1,
            loading: false,
        });
    }

    render() {
        return (
            <section name="Home">
                <h1>Home</h1>
                <section>
                    {this.state.loading && (
                        <h2>Loading post ...</h2>
                    )}
                    {
                        this.state.posts.map(post => <Post key={post.id} {...post} />)
                    }
                </section>
                <Link to="/post/1">
                    Go to Post
                </Link>
            </section>
        );
    }

}

export default Home;