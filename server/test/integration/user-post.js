const { User }  = require('../../src/models');
const { request, authentication_setup } = require('../utils/common');

const chai = require('chai');
const expect = chai.expect;

describe('User Post Routes', () => {
    before(async() => {
        const {token} = await authentication_setup();
        global.token = token;
    });

    after(async () => {
        User.collection.drop();
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
});