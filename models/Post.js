const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class Post extends Model {}
 
Post.init(
  {
    // add properites here, ex:
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1],
      },
    },

    post: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [6],
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
    modelName: "post",
  }
);
module.exports = Post;
