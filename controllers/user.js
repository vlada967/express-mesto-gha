const User = require('../models/user');
const { ValidationErrorCode, NotFoundErrorCode, DefaultErrorCode } = require('../errors/constants');

const getUsers = (req, res) => User.find({})
  .then((users) => res.send({ data: users }))
  .catch(() => res.status(DefaultErrorCode).send({ message: 'Произошла ошибка' }));

const findById = (req, res) => User.findById(req.params.userId)
  .then((user) => {
    if (!user) {
      return res.status(NotFoundErrorCode).send({ message: 'Пользователя с таким id нет' });
    }
    return res.send({ data: user });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(ValidationErrorCode).send({ message: 'Некорректные данные' });
    }
    return res.status(DefaultErrorCode).send({ message: 'Произошла ошибка' });
  });

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ValidationErrorCode).send({ message: 'Некорректные данные' });
      }
      return res.status(DefaultErrorCode).send({ message: 'Произошла ошибка' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ValidationErrorCode).send({ message: 'Некорректные данные' });
      }
      return res.status(DefaultErrorCode).send({ message: 'Произошла ошибка' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ValidationErrorCode).send({ message: 'Некорректные данные' });
      }
      return res.status(DefaultErrorCode).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  getUsers, findById, createUser, updateUser, updateAvatar,
};
