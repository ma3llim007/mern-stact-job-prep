import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log(
            `🛠️  MONGODB connected! DB Host: ${connectionInstance.connection.host} DB NAME: ${connectionInstance.connection.db.databaseName}`
        );
    } catch (error) {
        console.error("💀  MONGODB CONNECTION ERROR ", error.message);
        process.exit(1);
    }
};
export default connectDB;
