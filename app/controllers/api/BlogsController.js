const Joi = require('joi');

const useBlogRepository = require("../../repositories/BlogsRepository");
const blogsRepository = useBlogRepository();


function BlogController() {

  async function list(request, response) {
    const blogs = await blogsRepository.list();
    response.status(200).json(blogs);
  }

  async function show(request, response) {

    try {

      const blog = await blogsRepository.find(request.params.id);

      if (!blog) {
        return response.status(404).send({
          message: "Postagem não encontrada."
        })
      }

      response.status(200).json(blog);

    } catch (error) {
      response.status(500).json({
        message: "Postagem não encontrada"
      });
    }

  }

  async function save(request, response) {

    const validation = Joi.object({
      title: Joi.string().min(10).required(),
      description: Joi.string().min(10).required(),
      done: Joi.boolean().falsy()
    });

    try {
      // await validation.validateAsync(request.body);

      const blog = await blogsRepository.save(request.body);
      response.status(201).json(blog);

    } catch (error) {
      response.status(400).json(error.details)
    }
  }

  async function update(request, response) {
    const blog = await blogsRepository.find(request.params.id);

    if (!blog) {
      return response.status(404).send({
        message: "Publicação não encontrada."
      })
    }

    await blogsRepository.update(request.params.id, request.body);

    response.json({
      message: "Publicação atualizada."
    })
  }

  async function remove(request, response) {
    const blog = await blogsRepository.find(request.params.id);

    if (!blog) {
      return response.status(404).send({
        message: "Publicação não encontrada."
      })
    }

    await blogsRepository.remove(request.params.id);

    response.status(200).json({
      message: "Publicação removida."
    })

  }

  async function updateStatus(request, response) {
    const blog = await blogsRepository.find(request.params.id);

    if (!blog) {
      return response.status(404).send({
        message: "Publicação não encontrada."
      })
    }

    await blogsRepository.updateStatus(request.params.id, request.body.done);

    response.json({
      message: "Status da Publicação atualizado."
    })

  }

  return {
    save,
    list,
    show,
    remove,
    update,
    updateStatus,
  }

}

module.exports = BlogController();
