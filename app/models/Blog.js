const { DataTypes } = require('sequelize')
const { sequelize } = require('../core/sequelize');

const Blog = sequelize.define('Blogs', {
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  postagem: {
    type: DataTypes.TEXT,
  },
  date: {
    type: DataTypes.DATE,
  },
})

module.exports = Blog