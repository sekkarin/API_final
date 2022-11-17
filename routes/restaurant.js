const express = require("express")
const router = express.Router()
const restuarantController = require("../controllers/restuarantControl")


router.post('/restuarants',restuarantController.postRestuarants)
router.put('/updaterestuarant/:id/',restuarantController.updateRestuarant)
router.get("/restuarants",restuarantController.getRestuarants)
router.get("/restuarants/:id/",restuarantController.getRestuarantsbyId)
router.delete("/deleteRestuarant/:id/",restuarantController.deleteRestuarantById)

module.exports = router