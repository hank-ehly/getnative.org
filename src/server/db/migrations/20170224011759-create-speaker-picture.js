/**
 * 20170224000651-create-video
 * get-native.com
 *
 * Created by henryehly on 2017/01/24.
 */

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('speaker_pictures', {
            speaker_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'speakers',
                    key: 'id'
                },
                onUpdate: 'restrict',
                onDelete: 'restrict'
            },
            picture_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'pictures',
                    key: 'id'
                },
                onUpdate: 'restrict',
                onDelete: 'restrict'
            }
        });
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('speaker_pictures');
    }
};
