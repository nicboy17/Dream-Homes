const { User }  = require('../../src/models');
const { request,  authentication_setup, addBoardandPost } = require('../utils/common');

const chai = require('chai');
const expect = chai.expect;

describe('User Authenticated Routes', () => {
    before(async() => {
        const {token, id} = await authentication_setup();
        await addBoardandPost(id);
        global.token = token;
    });

    after(async () => {
        User.collection.drop();
    });

    describe('Update profile', () => {
        it('Should need return unauthorized', () => {
            return request
                .put('/users/test')
                .expect(401)
                .then((res) => {
                    expect(res.body.success).to.be.false;
                });
        }).timeout(10000);

        //need abs path to file
        it.skip('Should return valid', () => {
            return request
                .put('/users/test')
                .set({ 'access-token': global['token'] })
                .attach('image', '/Users/nick/Desktop/team-pineapple/server/test/utils/test-data/kenny.png')
                .expect(200)
                .then((res) => {
                    expect(res.body.user.profile).to.be.not.empty;
                    expect(res.body.success).to.be.true;
                });
        }).timeout(10000);

        it('Should return valid (no image)', () => {
            return request
                .put('/users/test')
                .set({ 'access-token': global['token'] })
                .field('name', 'test')
                .expect(200)
                .then((res) => {
                    expect(res.body.user.name).to.be.equal('test');
                    expect(res.body.success).to.be.true;
                });
        }).timeout(10000);
    });

    describe('Get user boards and posts', () => {
        it('Should need return unauthorized', () => {
            return request
                .get('/users/test')
                .expect(401)
                .then((res) => {
                    expect(res.body.success).to.be.false;
                });
        });

        //need abs path to file
        it('Should return valid', () => {
            return request
                .get('/users/test')
                .set({ 'access-token': global['token'] })
                .expect(200)
                .then((res) => {
                    expect(res.body.user.boards[0].title).to.be.equal('test board');
                    expect(res.body.user.posts[0].title).to.be.equal('test');
                    expect(res.body.success).to.be.true;
                });
        });

        it('Should return no user', () => {
            return request
                .get('/users/temp')
                .set({ 'access-token': global['token'] })
                .field('name', 'test')
                .expect(404)
                .then((res) => {
                    expect(res.body.success).to.be.false;
                });
        });
    });
});
