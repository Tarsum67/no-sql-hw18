const router = require('express').Router();

// server route /api/users

const {
	getUsers,
	createUser,
	getSingleUser,
	updateUser,
	deleteUser,
	addFriend,
	removeFriend,
} = require('../../controllers/userController.js');

router.route('/')
	.get(getUsers)
	.post(createUser);

router.route('/:userId')
	.get(getSingleUser)
	.put(updateUser)
	.delete(deleteUser);

router.route('/:userId/friends/:friendId')
	.post(addFriend)
	.delete(removeFriend);

module.exports = router;