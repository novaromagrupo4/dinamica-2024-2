const Task = require('../models/Task');

function useTasksRepository() {

  async function list() {
    const tasks = await Task.findAll({ raw: true });
    return tasks;
  }

  async function find(id) {
    const task = await Task.findByPk(id);
    return task;
  }

  async function save(dados) {
    const task = {
      title: dados.title,
      description: dados.description,
      done: false,
    }

    const task_created = await Task.create(task);
    return task_created;
  }

  async function update(id, dados) {
    const task = {
      title: dados.title,
      description: dados.description,
      done: dados.done === '1' ? true : false
    }

    const task_updated = await Task.update(task, { where: { id: id } });
    return task_updated;
  }

  async function remove(id) {
    await Task.destroy({ where: { id: id } });
  }

  function updateStatus(id, status) {
    const task = {
      done: status,
    }

 	  const task_updated = Task.update(task, { where: { id: id } });
    return task_updated;
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

module.exports = useTasksRepository;
