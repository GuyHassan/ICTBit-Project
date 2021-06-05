const mongoose = require("mongoose");
const userSchema = require('./userModel');
const pathMongo = "ictbit-mongo ;)";

// Connect to mongo
const initialMongo = async () => {
    await mongoose.connect(pathMongo, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return mongoose
}


const updateCurrentUser = async (currentUserID) => {
    try {
        //First element is a filter (searching the currentID), second element is update the element and in the end return the new updated record.
        return await userSchema.findOneAndUpdate(
            {
                ID: currentUserID
            },
            {
                ID: 'newId'
            })
    } finally {
        console.log('The user is not found !');
    }
};

// Raises the db to work.
const connectToMongo = async () => {
    await initialMongo().then(mongoose => {
        try {
            console.log('Connected to Mongo');
            let newUserAfterUpdate = updateCurrentUser()
        } finally {
            mongoose.connection.close()
        }
    })
}

connectToMongo();

