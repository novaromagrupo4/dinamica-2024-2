const Joi = require('joi');

const useTaskRepository = require("../../../app/repositories/TasksRepository");
const tasksRepository = useTaskRepository(); 


function TaskController() {

  async function list(request, response) {
    const tasks = await tasksRepository.list();
    response.status(200).json(tasks);
  }

  async function show(request, response) {

    try {

      const task = await tasksRepository.find(request.params.id);

      if (!task) {
        return response.status(404).send({
          message: "Tarefa não encontrada."
        })
      }

      response.status(200).json(task);

    } catch (error) {
      response.status(500).json({
        message: "Task não encontrada"
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

      const task = await tasksRepository.save(request.body);
      response.status(201).json(task);

    } catch (error) {
      response.status(400).json(error.details)
    }
  }

  async function update(request, response) {
    const task = await tasksRepository.find(request.params.id);

    if (!task) {
      return response.status(404).send({
        message: "Tarefa não encontrada."
      })
    }

    await tasksRepository.update(request.params.id, request.body);

    response.json({
      message: "Tarefa atualizada."
    })
  }

  async function remove(request, response) {
    const task = await tasksRepository.find(request.params.id);

    if (!task) {
      return response.status(404).send({
        message: "Tarefa não encontrada."
      })
    }

    await tasksRepository.remove(request.params.id);

    response.status(200).json({
      message: "Tarefa removida."
    })
    
  }

  async function updateStatus(request, response) {
    const task = await tasksRepository.find(request.params.id);

    if (!task) {
      return response.status(404).send({
        message: "Tarefa não encontrada."
      })
    }

    await tasksRepository.updateStatus(request.params.id, request.body.done);

    response.json({
      message: "Status da Tarefa atualizado."
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

module.exports = TaskController();
