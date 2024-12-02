const User = require('../models/User');
const bcrypt = require('bcrypt');

function UserController() {

  function list(req, res) {
    User.findAll({ raw: true })
      .then((data) => {
        res.render('users/list', {
          title: "Lista de Usuários",
          users: data,
        });
      })
      .catch((err) => console.log(err));
  }

  function create(req, res) {
    res.render('users/create');
  }

  async function save(req, res) {
    const body = req.body;

    if (body.password !== body.password_confirmation) {
      res.render('users/create', {
        error: {
          message: 'Os campos senha e confirmar senha são diferentes.'
        }
      });
      return;
    }

    const hashed_password = await bcrypt.hash(req.body.password, 10);

    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hashed_password,
    };

    try {
      await User.create(user);
      res.redirect('/users');
    } catch (error) {
      console.log(error);
    }
  }

  function remove(req, res) {
    const id = req.params.id;

    User.destroy({ where: { id: id } })
      .then(() => res.redirect('/users'))
      .catch((err) => console.log(err));
  }

  function edit(req, res) {
    const id = req.params.id;

    User.findOne({ where: { id: id }, raw: true })
      .then((data) => {
        res.render('users/edit', { user: data });
      })
      .catch((err) => console.log(err));
  }

  async function update(req, res) {
    const { id, name, email, password, active } = req.body;

    const user = {
      name,
      email,
      password,
      active: active === '1',
    };

    try {
      await User.update(user, { where: { id } });
      res.redirect('/users');
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao atualizar usuário.");
    }
  }

  async function updateStatus(req, res) {
    const id = req.params.id;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          message: "Usuário não encontrado"
        });
      }

      user.active = !user.active;
      await user.save();

      res.redirect('/users');
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Erro ao atualizar status do usuário"
      });
    }
  }

  return {
    create,
    save,
    list,
    remove,
    edit,
    update,
    updateStatus,
  };
}

module.exports = UserController();