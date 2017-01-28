import React, {Component} from 'react';
import {Link} from 'react-router';

import api from '../../api';
import Post from '../../posts/containers/Post.jsx';
import Loading from '../../share/components/Loading.jsx';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            posts: [],
            loading: true,
        };

        this.handleScroll = this.handleScroll.bind(this);
    }

    async componentDidMount() {
        const posts = await api.posts.getList(this.state.page);

        this.setState({
            posts,
            page: this.state.page + 1,
            loading: false,
        });

        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(e) {
        if (this.state.loading) return null;

        const [
            contentHeight,
            yOffset,
        ] = [
            window.document.body.offsetHeight, // Gets the page content height
            window.pageYOffset, // Gets the vertical scroll position
        ];
        const y = yOffset + window.innerHeight;

        if (!(y >= contentHeight)) {
            return null;
        }

        this.setState({
                loading: true,
            },
            async() => {
                try {
                    const post = await api.posts.getList(this.state.page);
                    this.setState({
                        posts: this.state.posts.concat(post),
                        page: this.state.page + 1,
                        loading: false,
                    });
                } catch (error) {
                    console.log(error);
                    this.setState({
                        loading: false,
                    });
                }
            }
        );
    }

    render() {
        return (
            <section name="Home">
                <h1>Home</h1>
                <section>
                    {
                        this.state.posts.map(post => <Post key={post.id} {...post} />)
                    }
                    {this.state.loading && (
                        <Loading />
                    )}
                </section>
            </section>
        );
    }

}

export default Home;