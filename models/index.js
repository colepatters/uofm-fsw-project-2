const User = require('./User');
const Question = require('./Question');
const Answer = require('./Answer');
const AnswerComment = require('./AnswerComment');
const Avatar = require('./Avatar');

// User answer relationship
User.hasMany(Answer, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Answer.belongsTo(User, {
    foreignKey: 'user_id',
});

// User answer comment relationship
User.hasMany(AnswerComment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

AnswerComment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// User avatar relationship
Avatar.hasMany(User, {
    foreignKey: 'avatar_id',
    onDelete: 'CASCADE',
});

User.belongsTo(Avatar, {
    foreignKey: 'avatar_id'
});

// Answer question relationship
Answer.belongsTo(Question, {
    foreignKey: 'question_id',
    onDelete: 'CASCADE',
});

Question.hasMany(Answer, {
    foreignKey: 'question_id'
});

/* Uncomment if user question feature is added */

// Question.belongsTo(User, {
//     foreignKey: 'user_id'
// });




module.exports = { Avatar, User, Question, Answer, AnswerComment };