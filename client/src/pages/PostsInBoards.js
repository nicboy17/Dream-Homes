import React, { Component } from 'react';
import Masonry from 'react-masonry-component';

class PostInBoards extends Component {
    constructor () {
        super();
        this.state = {
            placeholder: ''
        };
    }

    renderPosts = () => {
        const postsArray = [];
        const posts = postsArray.map(function (el) {
            return (
                <img
                    src={el}
                    key = {el}
                    alt = ''
                    style={{
                        width: '20vw',
                        height: 'auto',
                        borderRadius: '15px',
                        marginBottom: '15px'
                    }}></img>
            );
        });
        return postsArray.length === 0 ? (
            <h2 style={{
                textAlign: 'center'
            }}>
                You have no posts in this board :(
            </h2>
        ) : (
            <Masonry
                elementType={'div'}
                options={{ fitWidth: true, gutter: 15 }}
            >
                {posts}
            </Masonry>
        );
    }

    render () {
        return (
            <div>
                <h1 style={{
                    textAlign: 'center',
                    textDecoration: 'underline',
                    margin: '35px'
                }}>
                    Placeholder Name of Board
                </h1>
                <div style={{
                    display: 'grid',
                    justifyContent: 'center'
                }}>
                    {this.renderPosts()}
                </div>
            </div>
        );
    }
}

export default PostInBoards;
