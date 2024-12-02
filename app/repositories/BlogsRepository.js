const Blog = require('../models/Blog');

function useBlogsRepository() {

  async function list() {
    const blogs = await Blog.findAll({ raw: true });
    return blogs;
  }

  async function find(id) {
    const blogs = await Blog.findByPk(id);
    return blogs;
  }

  async function save(dados) {
    const blog = {
      title: dados.title,
      postagem: dados.postagem,
      date: dados.date,
    }

    const blog_created = await Blog.create(blog);
    return blog_created;
  }

  async function update(id, dados) {
    const blog = {
      title: dados.title,
      postagem: dados.postagem,
      date: dados.date,
    }

    const blog_updated = await Blog.update(blog, { where: { id: id } });
    return blog_updated;
  }

  async function remove(id) {
    await Blog.destroy({ where: { id: id } });
  }

  function updateStatus(id, status) {
    const blog = {
      done: status,
    }

    const blog_updated = Blog.update(blog, { where: { id: id } });
    return blog_updated;
  }

  return {
    list,
    find,
    save,
    remove,
    update,
    updateStatus,
  }

}

module.exports = useBlogsRepository;
