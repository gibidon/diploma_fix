const express = require("express")
const addSubscription = require("../controllers/subscription")
const router = express.Router({ mergeParams: true })

router.post("/", async (req, res) => {
	try {
		await addSubscription(req.body)

		res.send({ error: null })
	} catch (e) {
		res.send({ error: e.message })
	}
})

module.exports = router
