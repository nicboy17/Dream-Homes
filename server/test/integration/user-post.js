const { User, Board, Post } = require ('../../src/models');
const { request, authentication_setup, addBoardandPost } = require ('../utils/common');

const chai = require('chai');
const expect = chai.expect;

describe('User Post Routes', () => {
    before(async() => {
        const { token, id } = await authentication_setup ();
        const { post } = await addBoardandPost (id);
        global.token = token;
        global.post = post;
    });

    after(async () => {
        User.collection.drop();
        Board.collection.drop ();
        Post.collection.drop ();
    });

    describe('Create User Post', () => {
        //need abs path to file
        it.skip('Should return valid', () => {
            return request
                .post('/users/temp/posts')
                .set({ 'access-token': global['token'] })
                .attach('image', '/Users/nick/Desktop/team-pineapple/server/test/utils/test-data/kenny.png')
                .field('title', 'test post')
                .field('description', 'testing posts')
                .field('link', 'test')
                .field('tags', '[]')
                .expect(201)
                .then((res) => {
                    expect(res.body.success).to.be.true;
                    expect(res.body.post.title).to.be.equal('test post');
                });
        });

        it('Should return no user', () => {
            return request
                .post('/users/test/posts')
                .set({ 'access-token': global['token'] })
                .field('title', 'test post')
                .field('description', 'testing posts')
                .field('link', 'test')
                .field('tags', '[]')
                .expect(400)
                .then((res) => {
                    expect(res.body.success).to.be.false;
                });
        });

        it('Should return invalid', () => {
            return request
                .post('/users/temp/posts')
                .set({ 'access-token': global['token'] })
                .field('title', 'test post')
                .field('link', 'test')
                .expect(422)
                .then((res) => {
                    expect(res.body.success).to.be.false;
                });
        });
    });

    describe ('Add Post to User Favourites', () => {
        it ('Should need return unauthorized', () => {
            return request
                .post ('/users/test/favourite')
                .expect (401)
                .then ((res) => {
                    expect (res.body.success).to.be.false;
                });
        });

        it ('Should need return missing field', () => {
            return request
                .post ('/users/test/favourite')
                .set ({ 'access-token': global['token'] })
                .expect (422)
                .then ((res) => {
                    expect (res.body.success).to.be.false;
                });
        });

        //need abs path to file
        it ('Should return valid', () => {
            return request
                .post ('/users/test/favourite')
                .set ({ 'access-token': global['token'] })
                .send ({
                    post: global.post._id
                })
                .expect (201)
                .then ((res) => {
                    expect (res.body.success).to.be.true;
                });
        });
    });
});
