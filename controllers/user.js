const User = require('../models/user');

const getUsers = (req, res) => {
    return User.find({})
        .then(users => res.status(200).send({ data: users }))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

const findById = (req, res) => {
    return User.findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: 'Пользователя с таким id нет' })
            }
            res.status(200).send({ data: user })
        })
        .catch(err => {
            console.log(err);
            if (err.name === "CastError") {
                return res.status(400).send({ message: 'Некорректные данные' })
            }
            res.status(500).send({ message: 'Произошла ошибка' })
        });
};

const createUser = (req, res) => {
    const { name, about, avatar } = req.body;
    return User.create({ name, about, avatar })
        .then(user => res.status(200).send({ data: user }))
        .catch((err) => {
            if (err.name === "CastError") {
                return res.status(400).send({ message: 'Некорректные данные' })
            }
            res.status(500).send({ message: 'Произошла ошибка' })
        });
};

const updateUser = (req, res) => {
    const { name, about, avatar } = req.body;
    return User.findByIdAndUpdate(req.user._id, { name, about, avatar })
        .then(user => res.status(200).send({ data: user }))
        .catch((err) => {
            if (err.name === "CastError") {
                return res.status(400).send({ message: 'Некорректные данные' })
            }
            res.status(500).send({ message: 'Произошла ошибка' })
        });
};

const updateAvatar = (req, res) => {
    const { avatar } = req.body;
    return User.findByIdAndUpdate(req.user._id, { avatar })
        .then(user => res.status(200).send({ data: user }))
        .catch((err) => {
            if (err.name === "CastError") {
                return res.status(400).send({ message: 'Некорректные данные' })
            }
            res.status(500).send({ message: 'Произошла ошибка' })
        });
};

module.exports = { getUsers, findById, createUser, updateUser, updateAvatar };