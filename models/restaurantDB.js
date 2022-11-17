const sql = require('./db')

//  Constructor
const Restaurant = function (restaurant) {
    this.id = restaurant.id
    this.name = restaurant.name
    this.type = restaurant.type
    this.imageURL = restaurant.imageURL
}
Restaurant.create = (newRestaurant, result) => {
    sql.query("INSERT INTO `restaurants` SET ?", newRestaurant, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null)
            return
        }
        console.log("new inseted");
        result(null, { id: res.id, ...newRestaurant })
    })
}
Restaurant.getAll = (result) => {
    sql.query("SELECT * FROM `restaurants`", (err, res) => {
        if (err) {
            console.log(err);
            result(err, null)
            return
        }
        console.log("Get All");
        result(null, res)
    })
}
Restaurant.getbyId = (restaurantId, result) => {
    // SELECT * FROM `restaurants` WHERE id = restaurantId
    sql.query(`SELECT * FROM restaurants WHERE id = ${restaurantId}`, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null)
            return
        }
        if (res.length) {
            result(null, res[0])
            return
        }
        result({ kind: "not found" }, null)
    })
}
Restaurant.updateRestuarant = (id, params, result) => {

    sql.query(
        "UPDATE restaurants SET name = ?, type = ?,imageURL = ? WHERE id = ?",
        [params.name, params.type, params.imageURL, id], (err, res) => {
            if (err) {
                console.log(err);
                result(err, null)
                return
            }
            if (res.length == 0) {
                result({ kind: "not found" }, null)
                return
            }
            result(null, { id: id, ...params })
        }
    )
}
Restaurant.deleteRestuarant = (id, result) => {
    sql.query("DELETE FROM restaurants WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null)
            return
        }
        if (res.length == 0) {
            result({ kind: "not found" }, null)
            return
        }
        result(null, { id: id })
    })
}
module.exports = Restaurant