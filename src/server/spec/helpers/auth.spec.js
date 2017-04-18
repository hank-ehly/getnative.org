/**
 * auth.spec
 * get-native.com
 *
 * Created by henryehly on 2017/03/27.
 */

const helpers    = require('../../app/helpers');
const AuthHelper = helpers.Auth;
const Utility    = helpers.Utility;
const SpecUtil   = require('../spec-util');
const config     = require('../../config');
const k          = require('../../config/keys.json');

const assert     = require('assert');
const _          = require('lodash');

describe('Auth', function() {
    describe('hashPassword', function() {
        it(`should throw a ReferenceError if there is no input`, function() {
            assert.throws(() => AuthHelper.hashPassword(), ReferenceError);
        });

        it(`should throw a TypeError if the input is not a string`, function() {
            assert.throws(() => AuthHelper.hashPassword({}), TypeError);
            assert.throws(() => AuthHelper.hashPassword(123), TypeError);
            assert.throws(() => AuthHelper.hashPassword(true), TypeError);
            assert.throws(() => AuthHelper.hashPassword([]), TypeError);
        });

        it(`should generate a hash not equal to the password`, function() {
            assert.notEqual(AuthHelper.hashPassword('password'), 'password');
        });

        it(`should return a string`, function() {
            assert(_.isString(AuthHelper.hashPassword('password')));
        });
    });

    describe('verifyPassword', function() {
        it(`should throw a ReferenceError if there are less than 2 arguments`, function() {
            assert.throws(() => AuthHelper.verifyPassword('password'), ReferenceError);
        });

        it(`should throw a TypeError if either one of the input arguments are not a string`, function() {
            assert.throws(() => AuthHelper.verifyPassword({}, 'password'), TypeError);
            assert.throws(() => AuthHelper.verifyPassword('password', 123), TypeError);
            assert.throws(() => AuthHelper.verifyPassword(true, 'password'), TypeError);
            assert.throws(() => AuthHelper.verifyPassword('password', []), TypeError);
        });

        it(`should return false if a library-specify error occurs`, function() {
            assert.equal(AuthHelper.verifyPassword('password', 'password'), false);
        });

        it(`should return true if the password is a match`, function() {
            let hash = AuthHelper.hashPassword('password');
            assert(AuthHelper.verifyPassword(hash, 'password'));
        });

        it(`should return false if the password is not a match`, function() {
            let hash = AuthHelper.hashPassword('password');
            assert(!AuthHelper.verifyPassword(hash, '_password'));
        });
    });

    describe('generateVerificationToken', function() {
        it(`should return a string`, function() {
            assert(_.isString(AuthHelper.generateVerificationToken()));
        });

        it(`should return a string that is 32 characters in length`, function() {
            assert.equal(AuthHelper.generateVerificationToken().length, 32);
        });

        it(`should generate unique tokens`, function() {
            assert.notEqual(AuthHelper.generateVerificationToken(), AuthHelper.generateVerificationToken());
        });
    });

    describe('generateConfirmationURLForToken', function() {
        it(`should throw a ReferenceError if no verification token is provided`, function() {
            assert.throws(function() {
                AuthHelper.generateConfirmationURLForToken();
            }, ReferenceError);
        });

        it(`should throw a TypeError if the provided verification token is not a string`, function() {
            assert.throws(function() {
                AuthHelper.generateConfirmationURLForToken({not: ['a', 'string']});
            }, TypeError);
        });

        it(`should return a valid URL string`, function() {
            const token = AuthHelper.generateVerificationToken();
            const url = AuthHelper.generateConfirmationURLForToken(token);
            assert(SpecUtil.isValidURL(url));
        });

        it(`should return a string containing the verification token`, function() {
            const token = AuthHelper.generateVerificationToken();
            const url = AuthHelper.generateConfirmationURLForToken(token);
            assert(_.includes(url, token));
        });

        it(`should return a url whose hostname is that of the current environment`, function() {
            const hostname = config.get(k.API.Hostname);
            const token = AuthHelper.generateVerificationToken();
            const url = AuthHelper.generateConfirmationURLForToken(token);
            assert(_.includes(url, hostname));
        });

        it(`should return a url whose scheme is https`, function() {
            const token = AuthHelper.generateVerificationToken();
            const url = AuthHelper.generateConfirmationURLForToken(token);
            assert(_.startsWith(url, 'https://'));
        });
    });
});
