import mongoose from "mongoose";

export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!, { 
            autoIndex: true,
        });

        console.log("Connected to database");
    } catch (error) {
        console.log("Error connecting to database");
        console.error(error);
    }
}