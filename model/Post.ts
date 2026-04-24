import { model, models, Schema } from "mongoose";

const taskSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type: Boolean,
        default: false
    }
},{timestamps:true})
const Post = models?.Post || model("Post",taskSchema)
export default Post;