const User = require("../models/User")
const Reservation = require("../models/Reservation")
const Review = require("../models/Review")
const bcrypt = require("bcrypt")
const { generate } = require("../helpers/token")

async function register(login, password) {
	if (!password) {
		throw new Error("Password is empty")
	}

	const passwordHash = await bcrypt.hash(password, 10)

	const user = await User.create({ login, password: passwordHash })
	const token = generate({ id: user.id })

	return { user, token }
}

async function login(login, password) {
	const user = await User.findOne({ login })

	if (!user) {
		throw new Error("User not found")
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password)

	if (!isPasswordMatch) {
		throw new Error("Wrong password")
	}

	const token = generate({ id: user.id })

	return { user, token }
}

async function getUsers() {
	const users = await User.find({})

	return users
}

async function createReservation(userId, reservationData) {
	const newReservation = await Reservation.create(reservationData)

	await User.findByIdAndUpdate(userId, {
		$push: { reservations: newReservation },
	})
}

async function getUserReservations(userId) {
	const user = await User.findOne({ _id: userId })
	await user.populate({ path: "reservations", populate: { path: "user" } })

	return user.reservations
}

async function deleteUser(id) {
	const deletedUser = await User.deleteOne({ _id: id })

	//delete user reservations
	const deletedReservations = await Reservation.deleteMany({ user: id })

	//delete user's reviews
	const deletedReviews = await Review.deleteMany({ author: id })

	return deletedUser
}

module.exports = {
	login,
	register,
	getUsers,
	createReservation,
	getUserReservations,
	deleteUser,
}
