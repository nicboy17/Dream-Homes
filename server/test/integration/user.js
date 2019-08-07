const { User }  = require('../../src/models');
const { request, login } = require('../utils/common');

const chai = require('chai');
const expect = chai.expect;

describe('User Routes', () => {
    after(async () => {
        User.collection.drop();
    });

    describe('Register', () => {
        it('Should return valid', () => {
            return request
                .post('/users/register')
                .send({
                    'name': 'temp',
                    'username': 'temp',
                    'email': 'temp@gmail.com',
                    'password': 'Password1',
                })
                .expect(201)
                .then((res) => {
                    expect(res.body.success).to.be.true;
                });
        });

        it('Should return invalid', () => {
            return request
                .post('/users/register')
                .send({
                    'name': 'temp',
                    'username': '',
                    'email': 'temp@gmail.com',
                    'password': 'Password1',
                })
                .expect(422)
                .then((res) => {
                    expect(res.body.success).to.be.false;
                });
        });

        it('Should return duplicate', () => {
            return request
                .post('/users/register')
                .send({
                    'name': 'temp',
                    'username': 'temp',
                    'email': 'temp@gmail.com',
                    'password': 'Password1',
                })
                .expect(400)
                .then((res) => {
                    expect(res.body.success).to.be.false;
                });
        });
    });

    describe('Login', () => {
        it('Should return valid', () => {
            return login({
                username: 'temp',
                password: 'Password1'
            }).expect(200).then((res) => {
                expect(res.body.success).to.be.true;
            });
        });

        it('Should return invalid', () => {
            return login({
                username: 'temp',
                password: 'Password2'
            }).expect(400).then((res) => {
                expect(res.body.success).to.be.false;
            });
        });

        it('Should return no password', () => {
            return login({
                username: 'temp',
                password: ''
            }).expect(422).then((res) => {
                expect(res.body.success).to.be.false;
            });
        });
    });
});