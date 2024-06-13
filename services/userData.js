const { Answer, User, Avatar, Question } = require("../models");

async function getUserData(userId) {
    const dbUserData = await User.findByPk(userId, {
        attributes: { exclude: ["password"] },
        include: [
            { model: Avatar}, 
            {
                 model: Answer,
                 include: [{ model: Question }], 
            }
        ],
    });

    userData = dbUserData.get({ plain: true });

    const avatar = userData.Avatar;
    const answerArr = userData.Answers.map(answer => {
        return {
            question: answer.Question.question,
            answer: answer.answer
        }
    });
    console.log('answerArr', answerArr);
    return {
        user: userData,
        avatar,
        answers: answerArr,
    };
};

module.exports = {
    getUserData
};