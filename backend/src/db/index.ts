import mongoose from "mongoose"
import config from "config"

const connectMongoDB = async () => {
    await mongoose.connect(config.get("mongoUri"), {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log("Connected successfully to MongoDB");
};

export default connectMongoDB;
