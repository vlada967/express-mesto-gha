const router = require('express').Router();
const { getUsers, findById, createUser, updateUser, updateAvatar } = require('../controllers/user');

router.get('/', getUsers);
router.get('/:userId', findById);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;