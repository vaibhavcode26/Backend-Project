import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema(
    {
        videoFile : {
            required : true,
            type : String
        },
        thumbnail : {
            required : true,
            type : String
        },
        title : {
            required : true,
            type : String
        },
        description : {
            required : true,
            type : String
        },
        duration : {
            required : true,
            type : Number
        },
        views : {
            type : Number,
            default : 0
        },
        isPublished : {
            type : Boolean,
            default : true
        },
        owner : {
            type : Schema.Types.ObjectId,
            ref : "User"
        }

    },

    {
        timestamps : true
    }

)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = new mongoose.model("Video" , videoSchema)