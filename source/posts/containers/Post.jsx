import React, {Component, PropTypes} from 'react';

import api from '../../api.js';

class Post extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            user: {},
            comments: [],
        };
    }

    async componentDidMount() {
        const [
            user,
            comments,
        ] = await Promise.all([
            api.users.getSingle(this.props.userId),
            api.posts.getComments(this.props.id),
        ]);

        this.setState({
            loading: false,
            user,
            comments,
        });
    }

    commentLabel() {
        const [t, c] = (this.state.comments.length > 1) ? ['There are', 'comments'] : ['There is', 'comment']
        return ` - ${t} ${this.state.comments.length} ${c}`
    }

    render() {
        return (
            <article id={`post-${this.props.id}`}>
                <h2>{this.props.title}</h2>
                <p>
                    {this.props.body}
                </p>

                {!this.state.loading && (
                    <div>
                        <a href={`//${this.state.user.website}`} target="_blank" rel="nofollow">
                            {this.state.user.name}
                        </a>
                        <span>
                            {this.commentLabel()}
                        </span>
                    </div>
                )}
            </article>
        );
    }
}

Post.propTypes = {
    id: PropTypes.number,
    userId: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
};

export default Post;