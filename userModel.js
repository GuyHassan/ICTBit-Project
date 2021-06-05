
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Defining types
const types = (nType) => {
    return {
        type: nType,
        required: true
    }
}
/**
 * timestamps - On each update or new record he - add 2 values to the record that include the current date and time
 * Name and Age is same as Usermodel.ts
 * and ID is to search the current user, because name there is no primary key
 */
const UserSchema = new Schema({
    Name: types(String),
    Age: types(Number),
    ID: types(Number)
}, {
    timestamps: true
});


module.exports = mongoose.model('users', UserSchema);


