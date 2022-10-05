const Card = require('../models/card');

const getCards = (req, res) => {
    return Card.find({})
        .then(cards => res.status(200).send({ data: cards }))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createCard = (req, res) => {
    const { name, link } = req.body;
    return Card.create({ name, link, owner: req.user._id })
        .then(card => res.status(200).send({ data: card }))
        .catch((err) => {
            console.log(err)
            if (err.name === "ValidationError") {
                return res.status(400).send({ message: 'Некорректные данные' })
            }
            res.status(500).send({ message: 'Произошла ошибка' })
        });
};

const deleteById = (req, res) => {
    return Card.findByIdAndDelete(req.params.cardId)
        .then(() => res.status(200).send({ message: 'Карточка удалена' }))
        .catch(() => res.status(404).send({ message: 'Карточка не найдена' }));
};

const likeCard = (req, res) => {
    return Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true },
    )
        .then(card => res.status(200).send({ data: card }))
        .catch(err => res.status(404).send({ message: 'Карточка не найдена' }));
};

const dislikeCard = (req, res) => {
    return Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } },
        { new: true },
    )
        .then(card => res.status(200).send({ data: card }))
        .catch(err => res.status(404).send({ message: 'Карточка не найдена' }));
};

module.exports = { getCards, createCard, deleteById, likeCard, dislikeCard };