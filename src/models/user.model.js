import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

const userSchema = new Schema(
    {
        username : {
            required : true,
            type : String,
            unique : true,
            lowercase : true,
            trim : true,
            index : true
        },
        email : {
            required : true,
            type : String,
            unique : true,
            lowercase : true,
            trim : true
        },
        fullName : {
            required : true,
            type : String,
            trim : true,
            index : true
        },
        avatar : {
            type : String,
            required : true
        },
        coverImage : {
            type : String
        },
        watchHistory : [
            {
                type : Schema.Types.ObjectId,
                ref : "Video"
            }
        ],
        password : {
            required : [true , 'password is required'],
            type : String
        },
        refreshTokens : {
            type : String
        }
    },
    {
        timestamps : true
    }
)

userSchema.pre("save" , async function(next) {
    if(!this.isModified("password")) return next()
    this.password = bcrypt.hash(this.password ,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)

}

userSchema.methods.generateAccessToken = function (){
    jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )

}

userSchema.methods.generateRefreshToken = function (){
    jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
    
}



export const User = mongoose.model("User" , userSchema)