/* eslint-disable camelcase */
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { searchPosts } from '../actions/post';

import queryString from 'query-string';

import Posts from '../components/Posts/Posts';
import SnackBar from '../components/SnackBar/SnackBar';
import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import './stylesheet/Content.css';

class Search extends Component {
    state = {
        SnackBar: false
    };

    componentDidMount = () => {
        const { location, searchPosts } = this.props;
        const query = queryString.parse(location.search);
        const { search = '', filters = '' } = query;
        searchPosts(search, filters);
    };

    renderEmptyError = () => {
        if (!this.props.posts.posts.length) {
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
        }
        return (
            <div>
                <div className='placeholder' />
                <div className='buttonmenu'>
                    <div className='buttongrid'>
                        <Button className='option'>Cozy</Button>
                        <Button className='option'>Bohemian</Button>
                        <Button className='option'>Contemporary</Button>
                        <Button className='option'>Eclectic</Button>
                        <Button className='option'>Boho</Button>
                        <Button className='option'>Traditional</Button>
                        <Button className='option'>Simple</Button>
                    </div>
                </div>
                <Posts posts={this.props.posts.posts} />
                <div>
                    {this.renderEmptyError()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.PostStore,
    user: state.UserStore
});

export default connect(
    mapStateToProps,
    { searchPosts }
)(Search);
