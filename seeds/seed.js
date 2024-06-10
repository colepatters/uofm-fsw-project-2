const questionData = require("./question.json");
const { Question } = require("../models/index");
const sequelize = require("../config/connection");

sequelize.sync({ force: true }).then(async () => {

  await Question.bulkCreate(questionData);
  process.exit(0);
});