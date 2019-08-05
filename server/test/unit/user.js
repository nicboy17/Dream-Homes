const chai = require("chai");
const expect = chai.expect;

const User = require('../../src/models/user');

describe('User', () => {
    before((done) => {
        require('dotenv').config();
        require('../../config/mongo');
        done();
    });

    describe('Pre Save', () => {
        after(() => {
            User.collection.drop();
        });

        it('Should create new user',async() => {
            const user = await User.create({
                "name": "temp",
                "username": "temp",
                "password": "Password1",
                "email": "temp@gmail.com",
            });
            expect(await user.comparePassword('Password1')).to.be.true;
        });

        it('Should return error',async() => {
            try {
                await User.create({
                    "name": "temp",
                    "username": "temp",
                    "password": "",
                    "email": "temp@gmail.com",
                });
            } catch(err) {
                expect(err).to.not.be.empty;
            }
        });
    });

    describe('Password Verification', () => {
        after(() => {
            User.collection.drop();
        });

        it('Should match',async () => {
            const user = await User.create({
                "name": "temp",
                "username": "temp",
                "password": "Password1",
                "email": "temp@gmail.com",
            });

            expect(await user.comparePassword('Password1')).to.be.true;
            expect(await user.comparePassword('Password2')).to.be.false;
        });

        it('Password Salts are random',async () => {
            const user1 = await User.create({
                "name": "temp",
                "username": "temp",
                "password": "Password1",
                "email": "temp@gmail.com",
            });

            const user2 = await User.create({
                "name": "temp2",
                "username": "temp2",
                "password": "Password1",
                "email": "temp2@gmail.com",
            });

            expect(user1.password).to.not.be.equal(user2.password);
        });
    });

});