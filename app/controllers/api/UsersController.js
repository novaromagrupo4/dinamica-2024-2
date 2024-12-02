const User = require('../../models/User');
const bcrypt = require('bcrypt');

function UserController() {

  async function list(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] },
        raw: true
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        message: "Erro ao listar usuários"
      });
    }
  }

  async function show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: "Usuário não encontrado"
        });
      }

      res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao localizar usuário"
      });
    }
  }

  async function save(req, res) {
    const body = req.body;

    if (body.password !== body.confirm_password) {
      return res.status(400).json({
        message: "Os campos senha e confirmar senha são diferentes"
      });
    }

    const hashed_password = await bcrypt.hash(req.body.password, 10);

    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hashed_password,
    };

    try {
      const user_created = await User.create(user);
      return res.status(201).json(user_created);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao criar usuário"
      });
    }
  }

  async function remove(req, res) {
    const id = req.params.id;

    try {
      await User.destroy({ where: { id: id } });
      return res.status(200).json({
        message: "Usuário removido."
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao remover usuário"
      });
    }
  }

  async function update(req, res) {
    const id = req.params.id;

    const user = {
      name: req.body.name,
      email: req.body.email,
      active: req.body.active === '1' ? true : false
    };

    try {
      await User.update(user, { where: { id: id } });
      res.status(200).json({
        message: "Usuário atualizado."
      });
    } catch (error) {
      res.status(500).json({
        message: "Erro ao atualizar usuário"
      });
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

      res.status(200).json({
        message: "Status do usuário atualizado."
      });
    } catch (error) {
      res.status(500).json({
        message: "Erro ao atualizar status do usuário"
      });
    }
  }

  async function login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({
        where: { email: username },
      });

      if (!user) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Senha incorreta' });
      }

      user.password = undefined;
      res.status(200).json({ message: 'Autenticação bem-sucedida', user });
    } catch (error) {
      res.status(500).json({ error: 'Erro durante a autenticação' });
    }
  }

  return {
    list,
    show,
    save,
    remove,
    update,
    updateStatus,
    login,
  };
}

module.exports = UserController();