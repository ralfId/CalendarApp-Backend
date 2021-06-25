const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        await mongoose.connect(
            process.env.DBCONNECTION,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            });

        console.log('db online')

    } catch (error) {
        console.log(error);
        throw new Error('Error to initialize data base')
    }
}


module.exports = {
    dbConnection,
}