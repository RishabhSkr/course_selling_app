const mongoose = require('mongoose');

//define mongoose schema
const adminSchema = new mongoose.Schema({
  username:{type : String,required:true},
  password:{type:String}
});

const userSchema = new mongoose.Schema({
  username:{type : String},
  password:{type:String},
  purchasedCourses:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
});

const courseSchema = new mongoose.Schema({
  title:{type : String},
  description:{type:String},
  price : {type : Number},
  imageLink:String,
  published : Boolean

});

// define mongoose models
const User = mongoose.model('User',userSchema);
const Course = mongoose.model('Course',courseSchema);
const Admin = mongoose.model('Admin',adminSchema);

module.exports={
    User,
    Admin,
    Course
}