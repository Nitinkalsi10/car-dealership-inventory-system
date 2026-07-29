const { body } = require("express-validator");

exports.vehicleValidation = [

body("make").notEmpty(),

body("model").notEmpty(),

body("category").notEmpty(),

body("price").isNumeric(),

body("quantity").isInt({min:0})

];