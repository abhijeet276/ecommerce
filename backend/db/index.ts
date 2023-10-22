import mongoose, { ConnectOptions } from "mongoose";
const mongoPAth = process.env.DB_URL||"mongodb://127.0.0.1:27017/Ecommerce";
const db = () => {
    mongoose.connect(mongoPAth, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions).then(d => {
        console.log("database is connected successfully", d.connection.host);
    }).catch(err => {
        console.log(err)
    });
};

export default db;