const Car = require("../../models/Cars")

module.exports = {
    Mutation: {
        async registerCar(_, { car: { model, year } }) {
            
            const newCar = new Car({
                model,
                year
            })
            const res = await newCar.save()
            return {
                ...res._doc
            }
        }
    }
}