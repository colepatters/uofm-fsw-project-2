const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


class AnswerComment extends Model{};

AnswerComment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        answerComment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        answer_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'answer',
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
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
