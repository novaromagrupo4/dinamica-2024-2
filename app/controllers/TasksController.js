const Task = require('../models/Task');
const useTasksRepository = require("../repositories/TasksRepository");

const tasksRepository = useTasksRepository(); 

function TaskController() {

  async function list(req, res) {
    const tasks = await tasksRepository.list();

    res.render('tasks/list', { 
      title: "Lista de Tarefas",
      tasks: tasks
    })
  }

  function create(req, res) {
    res.render('tasks/create')
  }

  async function save(req, res) {
    await tasksRepository.save(req.body);
    res.redirect('/tasks');
  }

  async function remove(req, res) {
    await tasksRepository.remove(req.params.id);
    res.redirect('/tasks')
  }

  async function edit(req, res) {
    const task = await tasksRepository.find(req.params.id);
    res.render('tasks/edit', { task: task })
  }

  async function update(req, res) {
    await tasksRepository.update(req.body.id, req.body);
    res.redirect('/tasks');
  }

  async function updateStatus(req, res) {
    const done = req.body.done === '0' ? true : false;

    await tasksRepository.updateStatus(req.params.id, done);
    res.redirect('/tasks');
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

module.exports = TaskController();
