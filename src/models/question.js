const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Question = sequelize.define(
  "Question",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(Question, { foreignKey: "userId" });
Question.belongsTo(User, { foreignKey: "userId" });

module.exports = Question;
