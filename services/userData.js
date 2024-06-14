const { Answer, User, Avatar, Question } = require("../models");

async function getUserData(userId) {
    const dbUserData = await User.findByPk(userId, {
        attributes: { exclude: ["password"] },
        include: [
            { model: Avatar }, 
            {
                 model: Answer,
                 include: [{ model: Question }], 
            }
        ],
    });

    const userData = dbUserData.get({ plain: true });

    console.log('testing', userData);

    const avatar = userData.Avatar;
    const answerArr = userData.Answers.map(answer => {
        return {
            question: answer.Question.question,
            answer: answer.answer
        }
    });
    return {
        user: userData,
        avatar,
        answers: answerArr,
    };
};

module.exports = {
    getUserData
};