const express = require("express")
const authenticated = require("../middlewares/authenticated")
const hasRole = require("../middlewares/hasRole")
const ROLES = require("../constants/roles")
const mapReservation = require("../helpers/mapReservation")
const mapUser = require("../helpers/mapUser")

const {
	getUsers,
	createReservation,
	getUserReservations,
	deleteUser,
} = require("../controllers/user")

const {
	getReservations,
	deleteReservation,
	updateReservation,
} = require("../controllers/reservation")

const router = express.Router({ mergeParams: true })

router.post("/:id/reservations", authenticated, async (req, res) => {
	try {
		const newReservation = await createReservation(req.params.id, req.body)

		res.send({ data: newReservation, error: null })
	} catch (error) {
		res.send({ error: error.message || "Error creating reservation" })
	}
})

router.get("/:id/reservations", authenticated, async (req, res) => {
	try {
		const userReservations = await getUserReservations(req.params.id, req.body)

		res.send(userReservations.map(mapReservation))
	} catch (error) {
		res.send({ error: error.message || "Error getting reservations" })
	}
})

router.delete(
	"/reservations/:reservationId/hotels/:hotelId",
	async (req, res) => {
		try {
			await deleteReservation(req.params.reservationId, req.params.hotelId)

			res.send({ error: null })
		} catch (error) {
			res.send({ error: error.message })
		}
	}
)

router.patch("/reservations/:reservationId", async (req, res) => {
	try {
		const updatedReservation = await updateReservation(
			req.params.reservationId,
			{
				checkIn: req.body.checkIn,
				checkOut: req.body.checkOut,
				guestQuantity: req.body.guestQuantity,
			}
		)

		res.send({ data: updatedReservation, error: null })
	} catch (err) {
		res.send({ error: err.message })
	}
})

router.get("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	try {
		const users = await getUsers()

		res.send({
			users: users.map(mapUser).filter((user) => user.roleId !== ROLES.ADMIN),
			error: null,
		})
	} catch (error) {
		res.send({ error: error.message })
	}
})

router.delete(
	"/:id",
	authenticated,
	hasRole([ROLES.ADMIN]),
	async (req, res) => {
		try {
			const deletedUser = await deleteUser(req.params.id)

			res.send({ error: null })
		} catch (err) {
			res.send({ error: err.message })
		}
	}
)

router.get(
	"/reservations",
	authenticated,
	hasRole([ROLES.ADMIN]),
	async (req, res) => {
		try {
			const reservations = await getReservations({})

			res.send({ reservations: reservations.map(mapReservation), error: null })
		} catch (error) {
			res.send({ error: error.message })
		}
	}
)

module.exports = router
