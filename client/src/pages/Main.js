import React, { Component } from 'react';
import Posts from '../components/Posts/Posts';
import SnackBar from '../components/SnackBar/SnackBar';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/post';
import queryString from 'query-string';
import _ from 'lodash';
import { CircularProgress } from '@material-ui/core';

class Search extends Component {
    componentDidMount = () => {
        const { location, fetchPosts } = this.props;
        const query = queryString.parse(location.search);
        const { search_filter = '', easy_filters = '' } = query;
        if (this.props.user.authenticated) {
            const { _id = '' } = this.props.user.user;
            fetchPosts(search_filter, easy_filters, _id);
        } else {
            fetchPosts(search_filter, easy_filters, '');
        }
    };

    renderPosts = () => <Posts posts={this.props.posts.posts} />;

    renderEmptyError = () => {
        if (_.isEmpty(this.props.posts.posts)) {
            return (
                <SnackBar
                    message='There are no posts'
                    variant='error'
                    open={_.isEmpty(this.props.posts.posts)}
                />
            );
        }
    };

    render () {
        if (this.props.posts.loading) {
            return <CircularProgress/>;
        };
        return (
            <div>
                <div style={{ margin: 20 }}>{this.renderPosts()}</div>
                <div>{this.renderEmptyError()}</div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
    user: state.UserStore
});

export default connect(
    mapStateToProps,
    { fetchPosts }
)(Search);
