const useUsersRepository = require("../../app/repositories/UsersRepository");
const usersRepository = useUsersRepository(); 

test('Listando usuarios', async () => {
  const users = await usersRepository.list();

  expect(users).not.toBeNull();
  expect(users.length).toBeGreaterThan(0);
});

test('Salvar usuario com sucesso', async () => {
  const user = await usersRepository.save({
    name: "testinho",
    email: "testao@testados.org",
    password: "123456",
    password_confirmation: "123456"
  });
  expect(user.id).not.toBeNull();
  expect(user.name).not.toBeNull();
});

test('Encontrando User pelo ID', async () => {

  const user_data = {
    name: "testinho2",
    email: "testao2@testados.org",
    password: "1234567",
    password_confirmation: "1234567"
  };

  // Cria uma Task no banco
  const new_user = await usersRepository.save(user_data);

  const user = await usersRepository.find(new_user.id);

  expect(user.id).not.toBeNull();
  expect(user.name).toBe(new_user.name);
});

test('Atualizando um Usuário já existente', async () => {

  const user_data = {
    name: "testinho3",
    email: "testao3@testados.org",
    password: "12345678",
    password_confirmation: "12345678"
  };
  
  // Cria um User no banco
  const new_user = await usersRepository.save(user_data);

  // Busca o User
  let user = await usersRepository.find(new_user.id);

  // Alterando o User
  user.dataValues.name = "Testonhando",
  user.dataValues.email = "naometeste@testaminha.org"
  await usersRepository.update(user.dataValues.id, user.dataValues);

  // Busca o User e confirma o update
  const updated_user = await usersRepository.find(user.id);

  expect(updated_user.name).toBe(user.dataValues.name);
  expect(updated_user.email).toBe(user.dataValues.email);
});

test('Removendo User do banco de dados', async () => {

  // Cria um User no banco
  const new_user = await usersRepository.save({
    name: "testinho4",
    email: "testao4@testados.org",
    password: "1234678",
    password_confirmation: "1234678"
  });

  // Remove o User do banco
  await usersRepository.remove(new_user.id);

  // Assegura que a Task foi removida
  const user = await usersRepository.find(new_user.id);

  expect(user).toBeNull();
});

test('Atualizando o Status do usuario do banco de dados', async () => {

  //Cria um user no banco
  const new_user = await usersRepository.save({
    name: "testinho4",
    email: "testao4@testados.org",
    password: "1234678",
    password_confirmation: "1234678"
  });

  //Define o novo status
  status = {
    active: false
  }

  //Modifica o seu Status para desativado
  await usersRepository.updateStatus(new_user.id, status)

  //Pesquiser o Status do usuario
  const user_status = await usersRepository.find(new_user.id)
  expect(user_status).not.toBeNull();
  expect(user_status.dataValues.active).toBe(status.active);

})

