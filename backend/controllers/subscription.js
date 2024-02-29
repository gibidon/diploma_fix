const Subscription = require("../models/Subscription")

async function addSubscription(email) {
	try {
		const newSubscription = await Subscription.create(email)
		return newSubscription
	} catch (error) {
		return { error: error.message || "Error adding subscription" }
	}
}

module.exports = addSubscription
