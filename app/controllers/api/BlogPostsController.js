const BlogPosts = require('../../models/BlogPosts');

function BlogPostsController() {

  async function list(req, res) {
    try {
      const blogPosts = await BlogPosts.findAll({ raw: true });
      res.status(200).json(blogPosts);
    } catch (error) {
      res.status(500).json({
        message: "Erro ao buscar posts"
      });
    }
  }

  async function save(req, res) {
    const body = req.body;

    if (!body.title) {
      return res.status(500).json({
        message: "O campo título é obrigatório"
      });
    }

    if (!body.text) {
      return res.status(500).json({
        message: "O campo texto da postagem é obrigatório"
      });
    }

    if (!body.created_at) {
      return res.status(500).json({
        message: "O campo data de criação é obrigatório"
      });
    }

    if (!body.published_at) {
      return res.status(500).json({
        message: "O campo data de publicação é obrigatório"
      });
    }

    try {
      const blogPost = await BlogPosts.create(body);
      res.status(201).json(blogPost);
    } catch (error) {
      res.status(500).json({
        message: "Erro ao criar post"
      });
    }
  }

  async function remove(req, res) {
    const id = req.params.id;

    try {
      await BlogPosts.destroy({ where: { id: id } });
      return res.status(200).json({
        message: "Postagem removida."
      });
    } catch (error) { 
      res.status(500).json({
        message: "Erro ao remover post"
      });
    }
  }

  return {
    list, 
    save, 
    remove
  }
}

module.exports = BlogPostsController()