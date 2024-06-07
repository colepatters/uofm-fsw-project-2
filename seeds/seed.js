const questionData = require("./question");
const { Question } = require("../models");
const sequequlize = require("../config/connection");


sequequlize.sync({ force: true }).then(async () => {
  await Question.bulkCreate(questionData);
  process.exit(0);
});