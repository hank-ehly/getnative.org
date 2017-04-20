/**
 * validate-request-parameters
 * get-native.com
 *
 * Created by henryehly on 2017/03/20.
 */

const GetNativeError = require('../services').GetNativeError;
const k              = require('../../config/keys.json');

const Joi            = require('joi');
const _              = require('lodash');

const options        = {
    "abortEarly": false,
    "convert": true,
    "allowUnknown": true,
    "skipFunctions": false,
    "stripUnknown": false,
    "presence": "optional",
    "noDefaults": false
};

module.exports = function(schema) {
    if (!schema) {
        throw new Error('No schema found!');
    }

    return function(req, res, next) {
        let errors = [];

        if (schema.headers && schema.headers.authorization) {
            Joi.validate(req.headers, schema.headers, options, error => {
                if (!error) {
                    return;
                }

                error.details.forEach(d => {
                    if (d.path === 'authorization') {
                        res.status(401);
                        return next(new GetNativeError(k.Error.Auth, d.message));
                    }
                });
            });
        }

        ['headers', 'body', 'query', 'params'].forEach(key => {
            if (!schema[key]) {
                return;
            }

            Joi.validate(req[key], schema[key], options, error => {
                if (!error) {
                    return;
                }

                let details = error.details.map(obj => {
                    return new GetNativeError(k.Error.RequestParam, obj.message);
                });

                errors = _.concat(errors, details);
            });
        });

        if (_.gt(errors.length, 0)) {
            res.status(400);
            return next(errors);
        }

        return next();
    }
};
