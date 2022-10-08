const Card = require('../models/card');
const { ValidationErrorCode, NotFoundErrorCode, DefaultErrorCode } = require('../errors/constants');

const getCards = (req, res) => Card.find({})
  .then((cards) => res.send({ data: cards }))
  .catch(() => res.status(DefaultErrorCode).send({ message: 'Произошла ошибка' }));

const createCard = (req, res) => {
  const { name, link } = req.body;
  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ValidationErrorCode).send({ message: 'Некорректные данные' });
      }
      return res.status(DefaultErrorCode).send({ message: 'Произошла ошибка' });
    });
};

const deleteById = (req, res) => Card.findByIdAndRemove(req.params.cardId)
  .then((card) => {
    if (!card) {
      return res.status(NotFoundErrorCode).send({ message: 'Карточка не найдена' });
    }
    return res.send({ message: 'Карточка удалена' });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(ValidationErrorCode).send({ message: 'Некорректные данные' });
    }
    return res.status(DefaultErrorCode).send({ message: 'Произошла ошибка' });
  });

const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      return res.status(NotFoundErrorCode).send({ message: 'Карточка не найдена' });
    }
    return res.send({ data: card });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(ValidationErrorCode).send({ message: 'Некорректные данные' });
    }
    return res.status(DefaultErrorCode).send({ message: 'Произошла ошибка' });
  });

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      return res.status(NotFoundErrorCode).send({ message: 'Карточка не найдена' });
    }
    return res.send({ data: card });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(ValidationErrorCode).send({ message: 'Некорректные данные' });
    }
    return res.status(DefaultErrorCode).send({ message: 'Произошла ошибка' });
  });

module.exports = {
  getCards, createCard, deleteById, likeCard, dislikeCard,
};
