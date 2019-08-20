/* eslint-disable camelcase */
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchPosts } from '../actions/post';

import queryString from 'query-string';
import _ from 'lodash';

import Posts from '../components/Posts/Posts';
import SnackBar from '../components/SnackBar/SnackBar';
import { CircularProgress } from '@material-ui/core';
import Masonry from 'react-masonry-component';

import './stylesheet/Content.css';

class Search extends Component {
    state = {
        SnackBar: _.isEmpty(this.props.posts.posts)
    }

    componentDidMount = () => {
        const { location, fetchPosts, user: { authenticated, user } } = this.props;
        const query = queryString.parse(location.search);
        const { search_filter = '', easy_filters = '' } = query;
        if (authenticated) {
            const { _id = '' } = user;
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
                    open={this.state.SnackBar}
                    onClose = {() => this.setState({ SnackBar: false })}
                />
            );
        }
    };

    render () {
        if (this.props.posts.loading) {
            return <CircularProgress className = 'spinner'/>;
        };
        return (
            <div>
                <div className='placeholder' />
                <div className='buttonmenu'>
                    <div className='buttongrid'>
                        <button className='option'>Cozy</button>
                        <button className='option'>Bohemian</button>
                        <button className='option'>Contemporary</button>
                        <button className='option'>Eclectic</button>
                        <button className='option'>Boho</button>
                        <button className='option'>Traditional</button>
                        <button className='option'>Simple</button>
                    </div>
                </div>
                <div className='contentgrid'>
                    <Masonry
                        className='masonry'
                        elementType={'div'}
                        options={{ fitWidth: true, gutter: 15 }}
                    >
                        {this.renderPosts()}
                    </Masonry>
                </div>
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
