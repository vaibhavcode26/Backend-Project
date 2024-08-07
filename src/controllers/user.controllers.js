import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from '../utils/ApiResponse.js'


const registeruser = asyncHandler(async (req , res) => {
     const {fullName , email , password , username} = req.body
     console.log("Email: ",email)
     console.log("Password : " ,password)

     if([fullName , email , password , username].some((field)=> field?.trim() === "")){
        throw new ApiError(400 , "All fields are required")
     }

    const existedUser =  User.findOne({
        $or : [{username} , {email}]
     })

     if(existedUser){
        throw new ApiError(409 , "User with userName or emailaddress is already exists")
     }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath) {
        throw new ApiError(400 ,"Avatar File is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
      throw new ApiError(400 ,"Avatar File is required")
    }

    const user = User.create(
      {
         fullName,
         avatar: avatar.url,
         password,
         coverImage: coverImage?.url || "",
         email,
         username : username.toLowerCase()

      }
    )

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    )

    if(!createdUser){
      throw new ApiError(500 , "Something Went Wrong")
    }

    return res.status(201).json(
      new ApiResponse(200 , "User Registered Successfully")
    )
})

export {registeruser}