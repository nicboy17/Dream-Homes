const { User, Board, Post } = require ('../../src/models');
const { request, authentication_setup, addBoardandPost, addPostToBoard } = require ('../utils/common');

const chai = require ('chai');
const expect = chai.expect;

describe ('User Board Routes', () => {
    before (async () => {
        const { token, id } = await authentication_setup ();
        const { board } = await addBoardandPost (id);
        global.id = id;
        global.token = token;
        global.board = board;
    });

    after (async () => {
        User.collection.drop ();
        Board.collection.drop ();
        Post.collection.drop ();
    });

    describe ('Get Posts from Board', () => {
        it ('Should return valid', async () => {
            const { board } = await addPostToBoard (global['id']);
            await request
                .get(`/boards/${board._id}/posts`)
                .set ({ 'access-token': global['token'] })
                .expect (200)
                .then ((res) => {
                    expect (res.body.success).to.be.true;
                    expect (res.body.posts[0].title).to.be.equal ('valid');
                });
        });

        it ('Should return no posts', () => {
            return request
                .get(`/boards/${global['board']._id}/posts`)
                .set ({ 'access-token': global['token'] })
                .expect (404)
                .then ((res) => {
                    expect (res.body.success).to.be.false;
                });
        });

        it ('Should return invalid', () => {
            return request
                .get(`/boards/test/posts`)
                .set ({ 'access-token': global['token'] })
                .expect (422)
                .then ((res) => {
                    expect (res.body.success).to.be.false;
                });
        });
    });
});
