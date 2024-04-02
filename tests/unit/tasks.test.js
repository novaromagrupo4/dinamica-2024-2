const useTaskRepository = require("../../app/repositories/TasksRepository");
const tasksRepository = useTaskRepository(); 

test('Listando tasks', async () => {
  const tasks = await tasksRepository.list();

  expect(tasks).not.toBeNull();
  expect(tasks.length).toBeGreaterThan(0);
});

test('Salvar task com sucesso', async () => {
  const task = await tasksRepository.save({
    title: "Fazer compras",
    description: "Comprar café, pão e leite"
  });

  expect(task.id).not.toBeNull();
  expect(task.title).toBe("Fazer compras");
});

test('Encontrando Task pelo ID', async () => {

  const task_data = {
    title: "Nova Task",
    description: "Nova descrição da Task"
  };

  // Cria uma Task no banco
  const new_task = await tasksRepository.save(task_data);

  const task = await tasksRepository.find(new_task.id);

  expect(task.id).not.toBeNull();
  expect(task.title).not.toBeNull();
  expect(task.title).toBe(task_data.title);
});

test('Atualizando uma Task já existente', async () => {

  const task_data = {
    title: "Nova Task",
    description: "Nova descrição da Task"
  };
  
  // Cria uma Task no banco
  const new_task = await tasksRepository.save(task_data);

  // Busca a Task e altera
  const task = await tasksRepository.find(new_task.id);
  task.title = "Nova Task alterada";
  task.description = "Nova descrição da Task alterada";
  await task.save();

  // Busca a Task novamente e assegura que a alteração foi gravada no banco
  const updated_task = await tasksRepository.find(task.id);

  expect(updated_task.title).toBe(task.title);
  expect(updated_task.description).toBe(task.description);
});

test('Teste de soma', async () => {
  let resultado = 8 + 2;

  expect(resultado).toBe(10);
  expect(resultado).not.toBeNull();
  expect(resultado).toBeGreaterThan(9);
});

