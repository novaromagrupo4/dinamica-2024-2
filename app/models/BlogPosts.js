const { DataTypes } = require('sequelize')
const { sequelize } = require('../core/sequelize');

const table_options = {
  tableName: 'blog_posts'
};

const BlogPosts = sequelize.define('BlogPosts', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  published_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
}, table_options);

module.exports = BlogPosts