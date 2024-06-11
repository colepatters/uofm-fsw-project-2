const questionData = require("./question.json");
const avatarData = require("./avatar.json");
const { Question, Avatar } = require("../models/index");
const sequelize = require("../config/connection");

sequelize.sync({ force: true }).then(async () => {

  await Question.bulkCreate(questionData);
  await Avatar.bulkCreate(avatarData);
  process.exit(0);
});