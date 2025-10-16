import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = mongoose.Schema({
email:{
    type:String,
    unique: true,
    required: true
},
password:{
type: String,
required: true
},
role:{
type:String,
required:true,
trim:true
},
refreshToken:{
    type: String
}, 


}, {timeStamps: true})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


userSchema.methods.isPasswordCorrect = async function(password){
 return await bcrypt.compare(password,this.password)
}
export const User= mongoose.model("User", userSchema);