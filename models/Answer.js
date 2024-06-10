const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


class Answer extends Model{};

Answer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // question_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'Question',
        //         key: 'id',
        //     },
        // },
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'User',
        //         key: 'id',
        //     },
        // },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
    }
);

module.exports = Answer;