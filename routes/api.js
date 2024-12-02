const express = require("express");
const router = express.Router();

const TasksController = require("../app/controllers/api/TasksController");
const UsersController = require("../app/controllers/api/UsersController");
const BlogsController = require("../app/controllers/api/BlogsController");

// Rotas das Tarefas
router.get('/tasks', TasksController.list);
router.get('/tasks/:id', TasksController.show);
router.post('/tasks', TasksController.save);
router.delete('/tasks/:id', TasksController.remove);
router.put('/tasks/:id', TasksController.update);
router.put('/tasks/:id/update-status', TasksController.updateStatus);

// Rotas dos Blogs
router.get('/blogs', BlogsController.list);
router.get('/blogs/:id', BlogsController.show);
router.post('/blogs', BlogsController.save);
router.delete('/blogs/:id', BlogsController.remove);
router.put('/blogs/:id', BlogsController.update);
router.put('/blogs/:id/update-status', BlogsController.updateStatus);

// Rotas dos Usuários
router.get('/users', UsersController.list);
router.post('/users/login', UsersController.login);
router.get('/users/:id', UsersController.show);
router.post('/users', UsersController.save);
router.delete('/users/:id', UsersController.remove);
router.put('/users/:id', UsersController.update);
router.put('/users/:id/update-status', UsersController.updateStatus); // Adicionada rota para atualizar status

router.get('*', function notFound(request, response) {
  return response.status(404).json({ message: 'Página não encontrada' });
});

module.exports = router;