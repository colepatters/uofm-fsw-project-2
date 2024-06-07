const {Model, Datatypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


class Avatar extends Model{};

Avatar.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        image_url: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        name: {
            type: Datatypes.STRING,
            allowNull: false,
        },   
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
    }
);

module.exports = Avatar;