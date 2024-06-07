const {Model, Datatypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


class Answer extends Model{};

Answer.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        answer: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        question_id: {
            type: Datatypes.INTEGER,
            references: {
                model: 'question',
                key: 'id',
            },
        },
        user_id: {
            type: Datatypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
    }
);

module.exports = Answer;