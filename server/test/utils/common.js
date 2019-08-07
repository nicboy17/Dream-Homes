require('dotenv').config();
const { User, Board, Post } = require('../../src/models');
const app = require('../../app');
let request = require('supertest')(app);

module.exports = {
    login: (user) => {
        return request
            .post('/users/login')
            .send(user);
    },
    authentication_setup: async () => {
        const user = await User.create({
            name: 'test user',
            username: 'test',
            email: 'test@gmail.com',
            password: 'Password1'
        });

        return { token:user.loginToken(), id: user._id };
    },
    addBoardandPost: async (id) => {
        await Board.create({
            title: 'test board',
            user: id
        });
        await Post.create({
            title: 'test',
            description: 'test post',
            link: 'test link',
            tags: [],
            user: id,
            image: 'test image'
        });
    },
    request
};