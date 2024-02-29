const Review = require("../models/Review")
const Hotel = require("../models/Hotel")

async function addReview(hotelId, review) {
	try {
		const newReview = await Review.create(review)

		await Hotel.findByIdAndUpdate(hotelId, { $push: { reviews: newReview } })

		await newReview.populate("author")

		return newReview
	} catch (error) {
		return { error: error.message || "Error adding review" }
	}
}

async function deleteReview(hotelId, reviewId) {
	try {
		await Review.deleteOne({ _id: reviewId })

		await Hotel.findByIdAndUpdate(hotelId, { $pull: { reviews: reviewId } })
	} catch (error) {
		return { error: error.message || "Error deleteing review" }
	}
}

module.exports = { addReview, deleteReview }
