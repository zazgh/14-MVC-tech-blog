const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class Comment extends Model {}

Comment.init(
  {
    // add properites here, ex:
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Post_id: {
      type: DataTypes.INTEGER,
      references: {
        key: "id",
        model: "post",
      },
    },

    content: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [1],
      },
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        key: "id",
        model: "user",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);
module.exports = Comment;
