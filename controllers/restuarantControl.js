const Restaurant = require("../models/restaurantDB")

const postRestuarants = (req, res) => {
    const newRestaurant = new Restaurant({
        name: req.body.name,
        type: req.body.type,
        imageURL: req.body.imageURL
    })
    Restaurant.create(newRestaurant, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "some error"
            })
        } else {
            res.send(data)
        }
    })
}
const getRestuarants = (req, res) => {
    Restaurant.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "some error "
            })
        } else {
            res.send(data)
        }
    })

}
const getRestuarantsbyId = (req, res) => {
    const id = Number.parseInt(req.params.id)

    console.log(id);
    Restaurant.getbyId(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found")
                res.status(400).send({
                    message: "is not found"
                })
            else {
                res.status(500).send({
                    message: "error while restaurant"
                })
            }
        } else {
            res.send(data)
        }
    })
}
const updateRestuarant = (req,res)=>{
    console.log("update");
    const id = Number.parseInt(req.params.id)
    if(req.body.constructor == Object && Object.keys(req.body).length == 0){
        res.status(400).send({
            message:"is not found"
        })
    }
    Restaurant.updateRestuarant(id,new Restaurant(req.body),(err,data)=>{
        if (err) {
            if (err.kind === "not_found")
                res.status(400).send({
                    message: "is not found"
                })
            else {
                res.status(500).send({
                    message: "error while restaurant"
                })
            }
        } else {
            res.send(data)
        }
    })
}
const deleteRestuarantById =(req,res)=>{
    
    const id  = Number.parseInt(req.params.id)
    Restaurant.deleteRestuarant(id,(err,data)=>{
        if (err) {
            if (err.kind === "not_found")
                res.status(400).send({
                    message: "is not found"
                })
            else {
                res.status(500).send({
                    message: "error while restaurant"
                })
            }
        } else {
            res.send({message: "Restaurant id : " +id+ " is deleted"});
        }
    })
    console.log("delete");
}
module.exports = {
    getRestuarants,
    postRestuarants,
    updateRestuarant,
    getRestuarantsbyId,
    deleteRestuarantById
};