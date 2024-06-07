const {Model, DataTypes} = require('sequelize');
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
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        display_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avatar_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Avatar',
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