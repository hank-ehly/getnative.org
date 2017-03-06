/**
 * index
 * get-native.com
 *
 * Created by henryehly on 2017/02/23.
 */

let fs = require('fs');
let path = require('path');
let Sequelize = require('sequelize');
let basename = path.basename(module.filename);
let env = process.env.NODE_ENV || 'development';
let config = require(__dirname + '/../../db/database.json')[env];
let db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname).filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(function(file) {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].options.associations) {
        db[modelName].options.associations(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
