const Joi = require('joi');

const useTaskRepository = require("../../../app/repositories/TasksRepository");
const tasksRepository = useTaskRepository(); 


function TaskController() {

  async function list(req, res) {
    const tasks = await tasksRepository.list();
    res.status(200).json(tasks);
  }

  async function show(req, res) {

    try {

      const task = await tasksRepository.find(req.params.id);

      if (!task) {
        return res.status(404).send({
          message: "Tarefa não encontrada."
        })
      }

      res.status(200).json(task);

    } catch (error) {
      res.status(500).json({
        message: "Task não encontrada"
      });
    }
    
  }

  async function save(req, res) {

    const validation = Joi.object({
      title: Joi.string().min(10).required(),
      description: Joi.string().min(10).required(),
      done: Joi.boolean().falsy()
    });

    try {
      // await validation.validateAsync(req.body);

      const task = await tasksRepository.save(req.body);
      res.status(201).json(task);

    } catch (error) {
      res.status(400).json(error.details)
    }
  }

  async function update(req, res) {
    const task = await tasksRepository.find(req.params.id);

    if (!task) {
      return res.status(404).send({
        message: "Tarefa não encontrada."
      })
    }

    await tasksRepository.update(req.params.id, req.body);

    res.json({
      message: "Tarefa atualizada."
    })
  }

  async function remove(req, res) {
    const task = await tasksRepository.find(req.params.id);

    if (!task) {
      return res.status(404).send({
        message: "Tarefa não encontrada."
      })
    }

    await tasksRepository.remove(req.params.id);

    res.status(200).json({
      message: "Tarefa removida."
    })
    
  }

  async function updateStatus(req, res) {
    const task = await tasksRepository.find(req.params.id);

    if (!task) {
      return res.status(404).send({
        message: "Tarefa não encontrada."
      })
    }

    await tasksRepository.updateStatus(req.params.id, req.body.done);

    res.json({
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
