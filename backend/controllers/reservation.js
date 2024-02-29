const Reservation = require("../models/Reservation")
const User = require("../models/User")

async function updateReservation(id, reservation) {
	try {
		const newReservation = await Reservation.findByIdAndUpdate(
			id,
			reservation,
			{
				returnDocument: "after",
			}
		)

		return newReservation
	} catch (error) {
		return { error: error.message || "Error updating reservation" }
	}
}

async function deleteReservation(reservationId, hotelId) {
	try {
		await Reservation.deleteOne({ _id: reservationId })

		await User.findByIdAndUpdate(hotelId, {
			$pull: { reservations: { hotel: hotelId } },
		})
	} catch (error) {
		return { error: error.message }
	}
}

async function getReservations() {
	try {
		const reservations = Reservation.find({})

		return reservations
	} catch (error) {
		return { error: error.message }
	}
}

module.exports = { getReservations, updateReservation, deleteReservation }
