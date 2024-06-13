const { Answer, User, Avatar, Question } = require("../models");

async function getUserData(userId) {
    const userQuery = await User.findByPk(userId, {
        attributes: { exclude: ["password"] },
    });
    const userData = userQuery.dataValues

    let avatar = await Avatar.findByPk(userData.avatar_id)
  
    let userAnswers = await Answer.findAll({
        where: {
            user_id: userId
        }
    })

    let temp = []
    for await (const currentAnswerRef of userAnswers) {
        const answer = currentAnswerRef.dataValues
        const questionQuery = await Question.findByPk(currentAnswerRef.question_id)
        temp.push({
            question: questionQuery.dataValues,
            answer: answer
        })
    }

    return {
        user: userData,
        avatar: avatar.dataValues,
        answers: temp
    }
}

module.exports = {
    getUserData
}