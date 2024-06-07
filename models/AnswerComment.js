const {Model, Datatypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


class AnswerComment extends Model{};

AnswerComment.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        answerComment: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        answer_id: {
            type: Datatypes.INTEGER,
            references: {
                model: 'answer',
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

module.exports = AnswerComment;
