const response = require("@utils/response");
const validator = require("validator");
const userService = require("@services/user");

async function getCanceledBookings(req, res, next){
    const errors = validate(req.body);

    if(errors.length > 0) return response(res, {
        success: false,
        code: 400,
        errors,
    });

    try{
        const result = await userService.getCanceledBookings({user: req.user});
        response(res, result);
    }
    catch(error){
        next(error);
    }
}

function validate(payload){
    const errors = [];
    return errors;
}

module.exports = getCanceledBookings;
