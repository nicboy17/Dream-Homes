import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchPosts } from '../actions/post';
import queryString from 'query-string';
import Posts from '../components/Posts/Posts';
import { CircularProgress } from '@material-ui/core';
import './stylesheet/Content.css';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom';
import Login from '../components/Dialog/Login/Login';
import SignUp from '../components/Dialog/SignUp/SignUp';

class Main extends Component {
    state = {
        SnackBar: false,
        filters: ['Cozy', 'Bohemian', 'Contemporary', 'Eclectic', 'Boho', 'Traditional', 'Simple']
    };

    componentDidMount = () => {
        const { location, searchPosts, user, history } = this.props;
        if (!user.authenticated) {
            history.push('/login');
        }
        const query = queryString.parse(location.search);
        const { search = '', filters = '' } = query;
        searchPosts(search, filters);
    };

    render () {
        if (this.props.posts.loading) {
            return <CircularProgress className = 'spinner'/>;
        }
        return (
            <div>
                <div className='placeholder' />
                {/* <div className='buttonmenu'> */}
                {/*    <div className='buttongrid'> */}
                {/*        {this.state.filters.map(filter => <Button className='option'>{filter}</Button>)} */}
                {/*    </div> */}
                {/* </div> */}
                <Posts posts={this.props.posts.posts} />
                <Route path='/login' component={Login} />
                <Route path='/signup' component={SignUp} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.PostStore,
    user: state.UserStore
});

function mapDispatchToProps (dispatch) {
    return bindActionCreators(
        {
            searchPosts
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
