const express = require("express")

const router = express.Router({ mergeParams: true })

router.use("/", require("./auth"))
router.use("/hotels", require("./hotel"))
router.use("/subscriptions", require("./subscription"))
router.use("/users", require("./user"))

module.exports = router
