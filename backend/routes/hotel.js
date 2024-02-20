const express = require("express")
const mapHotel = require("../helpers/mapHotel")
const mapReview = require("../helpers/mapReview")

const {
	addHotel,
	editHotel,
	getHotels,
	getHotel,
	deleteHotel,
} = require("../controllers/hotel")

const { addReview, deleteReview } = require("../controllers/review")

const authenticated = require("../middlewares/authenticated")
const hasRole = require("../middlewares/hasRole")
const ROLES = require("../constants/roles")

const router = express.Router({ mergeParams: true })

router.get("/", async (req, res) => {
	try {
		const { hotels, lastPage } = await getHotels(
			req.query.search,
			req.query.limit,
			req.query.page,
			req.query.country,
			req.query.min,
			req.query.max,
			req.query.rating
		)

		res.send({ hotels: hotels.map(mapHotel), lastPage })
	} catch (err) {
		return { error: err.message }
	}
})

router.get("/:id", async (req, res) => {
	try {
		const hotel = await getHotel(req.params.id)

		res.send({ data: mapHotel(hotel), error: null })
	} catch (err) {
		return { error: err.message }
	}
})

router.post(
	"/create",
	authenticated,
	hasRole([ROLES.ADMIN]),
	async (req, res) => {
		try {
			const newHotel = await addHotel({
				title: req.body.title,
				rating: req.body.rating,
				description: req.body.description,
				price: req.body.price,
				country: req.body.country,
			})

			res.send({ data: mapHotel(newHotel) })
		} catch (err) {
			return { error: err.message }
		}
	}
)

router.patch(
	"/:id",
	authenticated,
	hasRole([ROLES.ADMIN]),
	async (req, res) => {
		try {
			const updatedHotel = await editHotel(req.params.id, {
				title: req.body.title,
				description: req.body.description,
				country: req.body.country,
				rating: req.body.rating,
				price: req.body.price,
				images: req.body.images,
			})

			res.send({ data: mapHotel(updatedHotel) })
		} catch (err) {
			return { error: err.message }
		}
	}
)

router.delete(
	"/:id",
	authenticated,
	hasRole([ROLES.ADMIN]),
	async (req, res) => {
		try {
			await deleteHotel(req.params.id)

			res.send({ error: null })
		} catch (err) {
			return { error: err.message }
		}
	}
)

router.post("/:id/reviews", authenticated, async (req, res) => {
	try {
		const newReview = await addReview(req.params.id, {
			content: req.body.content,
			author: req.user.id,
		})

		res.send({ data: mapReview(newReview) })
	} catch (err) {
		return { error: err.message }
	}
})

router.delete(
	"/:hotelId/reviews/:reviewId",
	authenticated,
	async (req, res) => {
		try {
			await deleteReview(req.params.hotelId, req.params.reviewId)

			res.send({ error: null })
		} catch (err) {
			return { error: err.message }
		}
	}
)

module.exports = router
