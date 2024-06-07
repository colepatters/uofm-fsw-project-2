const User = require('./User');
const Question = require('./Question');
const Answer = require('./Answer');
const AnswerComment = require('./AnswerComment');
const Avatar = require('./Avatar');

User.hasMany(Answer, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

User.hasMany(AnswerComment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

User.hasOne(Avatar, {
    foreignKey: 'avatar_id',
    onDelete: 'CASCADE',
});

Answer.belongsTo(User, {
    foreignKey: 'user_id',
});

AnswerComment.belongsTo(User, {
    foreignKey: 'user_id',
});

Avatar.belongsTo(User, {
    foreignKey: 'avatar_id',
});


module.exports = { User, Question, Answer, AnswerComment, Avatar };