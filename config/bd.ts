import mongoose from "mongoose"
export const dbconnect = async()=>{
    try {
        if(mongoose.connection.readyState >= 1){
            return;
        }
        await mongoose.connect(process.env.URL as string);
        console.log("DB connected")
    } catch (error) {
        return console.log("DB error: ",error)
    }
}