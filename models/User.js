const {Model, Datatypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


class User extends Model{
    checkPassword(password) {
        return bcrypt.compare(password, this.password);
    }
};

User.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        display_name: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        username: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        avatar_id: {
            type: Datatypes.INTEGER,
            references: {
                model: 'avatar',
                key: 'id',
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData
            },
            beforeUpdate: async (updatedUserData) => {
                if (updatedUserData._changed.has("password")) {
                    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                }
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
    }
);

module.exports = User;