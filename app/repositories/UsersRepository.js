const User = require('../models/User');
const bcrypt = require('bcrypt');


function useUsersRepository() {

  async function list() {
    const users = await User.findAll({ raw: true });
    return users;
  }

  async function find(id) {
    const user = await User.findByPk(id);
    return user;
  }

  async function save(dados) {

    if (!dados.name) {
      return {
        error: {
          message: 'O campo nome é obrigatório.'
        }
      }
    }

    if (!dados.email) {
      return {
        error: {
          message: 'O campo email é obrigatório.'
        }
      }
    }

    if (!dados.password) {
      return {
        error: {
          message: 'O campo senha é obrigatório.'
        }
      }
    }

    if (!dados.password_confirmation) {
      return {
        error: {
          message: 'O campo confirmar senha é obrigatório.'
        }
      }
    }

    if (dados.password !== dados.password_confirmation) {
      return {
        error: {
          message: 'Os campos senha e confirmar senha são diferentes.'
        }
      }
    }

    const hashed_password = await bcrypt.hash(dados.password, 10);

    const user = {
      name: dados.name,
      email: dados.email,
      password: hashed_password
    }

    const user_created = await User.create(user);
    return user_created;
  }

  async function update(id, dados) {

    const user = {
      name: dados.name,
      email: dados.email,
      active: dados.active === "1" ? true : false
    }

    const user_updated = await User.update(user, { where: { id: id } });
    return user_updated;
  }

  async function remove(id) {
    await User.destroy({ where: { id: id } });
  }

  function updateStatus(id, status) {
    const user = {
      active: status.active === '1' ? true : false,
    }

 	  const user_updated = User.update(user, { where: { id: id } });
    return user_updated;
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

module.exports = useUsersRepository;
