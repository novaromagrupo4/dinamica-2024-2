const Blog = require('../models/Blog');
const useBlogsRepository = require("../repositories/BlogsRepository");

const blogsRepository = useBlogsRepository();

function blogController() {

  async function list(req, res) {
    const blogs = await blogsRepository.list();

    res.render('blogs/list', {
      title: "Lista de Publicações",
      blogs: blogs
    })
  }

  function create(req, res) {
    res.render('blogs/create')
  }

  async function save(req, res) {
    await blogsRepository.save(req.body);
    res.redirect('/blogs');
  }

  async function remove(req, res) {
    await blogsRepository.remove(req.params.id);
    res.redirect('/blogs')
  }

  async function edit(req, res) {
    const blog = await blogsRepository.find(req.params.id);
    res.render('blogs/edit', { blog: blog })
  }

  async function update(req, res) {
    await blogsRepository.update(req.body.id, req.body);
    res.redirect('/blogs');
  }

  async function updateStatus(req, res) {
    const done = req.body.done === '0' ? true : false;

    await blogsRepository.updateStatus(req.params.id, done);
    res.redirect('/blogs');
  }

  return {
    create,
    save,
    list,
    remove,
    edit,
    update,
    updateStatus,
  }

}

module.exports = blogController();
