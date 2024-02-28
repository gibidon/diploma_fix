const Hotel = require("../models/Hotel")

async function getHotels(
	search = "",
	limit = 10,
	page = 1,
	country = "",
	min = 1,
	max = 400
) {
	const [hotels, count] = await Promise.all([
		Hotel.find({
			$and: [
				{ title: { $regex: search, $options: "i" } },
				{
					country: { $regex: country, $options: "i" },
				},
				{ price: { $gt: Number(min) | 1, $lt: Number(max) || 999 } },
			],
		})
			.limit(limit)
			.skip((page - 1) * limit),

		Hotel.countDocuments({ title: { $regex: search, $options: "i" } }),
	])

	return { hotels, lastPage: Math.ceil(count / limit) }
}

async function addHotel(hotel) {
	const newHotel = await Hotel.create(hotel)

	return newHotel
}

async function editHotel(id, hotelData) {
	const newHotel = await Hotel.findByIdAndUpdate(id, hotelData, {
		returnDocument: "after",
	})
	await newHotel.populate({ path: "reviews", populate: "author" })

	return newHotel
}

async function getHotel(id) {
	return await Hotel.findById(id).populate({
		path: "reviews",
		populate: "author",
	})
}

async function deleteHotel(id) {
	const deletedHotel = await Hotel.deleteOne({ _id: id })

	return deletedHotel
}

module.exports = {
	addHotel,
	deleteHotel,
	editHotel,
	getHotel,
	getHotels,
}
