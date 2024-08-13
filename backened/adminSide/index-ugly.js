const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const secret ="s3cr3t";

app.use(cors());
app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

// TODO : Resolve a bug that same admin can sign as a user and can add courses as a user.Use diff secret or different function

const authenticateJwt= (req,res,next)=>{
  const token = req.headers.authorization;
  if(!token || !token.startsWith('Bearer')){
    return res.status(401).json({message : 'Unauthorized : Invalid token!'});
  }

  const splitToken = token.split(' ');
  console.log(splitToken);
  // splitted token = ['Bearer','dfsafdsfsgsfdsgf']
  const jwtToken = splitToken[1];
  jwt.verify(jwtToken,secret,(err,decoded)=>{
    if(err){
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }else{
      // Store the decoded token data in the request object for further use if needed
    // req.decodedToken = decoded;
    req.user = decoded;
    next();
    }
  });
};

// mongoose connect

mongoose.connect('mongodb+srv://admin-Rishabh:test123@cluster0.3dhqeuz.mongodb.net/courses', {
  
});

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
  published : {type: Boolean}

});

// define mongoose models
const User = mongoose.model('User',userSchema);
const Course = mongoose.model('Course',courseSchema);
const Admin = mongoose.model('Admin',adminSchema);


// Admin routes
app.post('/admin/signup',async (req, res) => {
  // logic to sign up admin
  const {username,password} = req.body;
  const admin = await Admin.findOne({username});
  if(admin){
    res.status(403).json({message: "Admin already exist!"});
  }else{
   
    const newAdmin = new Admin({username,password});
    await newAdmin.save()
    const token = jwt.sign({username,role:'admin',},secret,{expiresIn:'1h'});
    res.status(201).json({message: "Admin created successfully!",token});
  }
});

app.post('/admin/login', async(req, res) => {
  // logic to log in admin
 const {username,password} = req.headers;
 const admin = await Admin.findOne({username,password});
  if(admin){
    const token = jwt.sign({username,role:'admin'},secret,{expiresIn:'1h'});
    res.json({message:"Admin login successfully!",token});
    }else{
      res.status(401).json({message :"Invalid Creadentials!"});
  }
});

app.post('/admin/courses',authenticateJwt,async (req, res) => {
  // logic to create a course
  const course = new Course(req.body);
  await course.save();
  res.json({message : "Course created successfully!",courseID:course.id});

});

app.put('/admin/courses/:courseId',authenticateJwt, async (req, res) => {
  // logic to edit a course
  const course = await Course.findByIdAndUpdate(req.params.courseId,req.body,{new : true});
  if(course){
     res.json({message : 'Course Updated Successfully!'});
  }else{
    res.status(404).json({message : 'Course Not Found!'});
  }

});

app.get('/admin/courses',authenticateJwt,async (req, res) => {
  // logic to get all courses
  const course = await Course.find({}); // for all course if Published courses see pass published : true;
  res.json({course});
});

// User routes
app.post('/users/signup', async (req, res) => {
  // logic to sign up user
    const {username,password} = req.body;
    const user = await User.findOne({username});
    if(user){
      res.status(403).json({message: "user already exist!"});
    }else{
      const newUser = new User({username,password});
      await newUser.save();
      const token = jwt.sign({username:username,role:'user'},secret,{expiresIn:'1h'});
      res.status(201).json({message: "User created successfully!",token});
    }
});

app.post('/users/login', async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: 'user' }, secret, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.get('/users/courses',authenticateJwt,async (req, res) => {
  // logic to list all courses
  const courses = await Course.find({published:true});
  res.json({courses})
});

app.post('/users/courses/:courseId', authenticateJwt,async (req, res) => {
  // logic to purchase a course
  const course =await Course.findById(req.params.courseId);
  console.log(course);
  if(course){
    const user = await User.findOne({username : req.user.username});
      if(user){
        user.purchasedCourses.push(course);
        await user.save();
        res.json({message : 'Course purchased succesfully!'});
      }else{
        res.json({message : 'User Not Found!'});
      }
  }else{
    res.status(404).json({message: "Course not found!"});
  }

});



app.get('/users/purchasedCourses', authenticateJwt,async (req, res) => {
  // logic to view purchased courses
  const user = await User.findOne({username:req.user.username}).populate('purchasedCourses');
  if(user){
    res.json({purchasedCourses:user.purchasedCourses || []});
  }else{
    res.status(403).json({message : 'User not found!'});
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});


// const express = require('express');
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const app = express();

// app.use(express.json());
// app.use(cors());

// const SECRET = 'SECr3t';  // This should be in an environment variable in a real application

// // Define mongoose schemas
// const userSchema = new mongoose.Schema({
//   username: {type: String},
//   password: String,
//   purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
// });

// const adminSchema = new mongoose.Schema({
//   username: String,
//   password: String
// });

// const courseSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   price: Number,
//   imageLink: String,
//   published: Boolean
// });

// // Define mongoose models
// const User = mongoose.model('User', userSchema);
// const Admin = mongoose.model('Admin', adminSchema);
// const Course = mongoose.model('Course', courseSchema);

// const authenticateJwt = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, SECRET, (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };

// // Connect to MongoDB
// // DONT MISUSE THIS THANKYOU!!
// mongoose.connect('mongodb+srv://admin-Rishabh:test123@cluster0.3dhqeuz.mongodb.net/courses', {
//   useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" 
// });
// app.post('/admin/signup', (req, res) => {
//   const { username, password } = req.body;
//   function callback(admin) {
//     if (admin) {
//       res.status(403).json({ message: 'Admin already exists' });
//     } else {
//       const obj = { username: username, password: password };
//       const newAdmin = new Admin(obj);
//       newAdmin.save();
//       const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
//       res.json({ message: 'Admin created successfully', token });
//     }

//   }
//   Admin.findOne({ username }).then(callback);
// });

// app.post('/admin/login', async (req, res) => {
//   const { username, password } = req.headers;
//   const admin = await Admin.findOne({ username, password });
//   if (admin) {
//     const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
//     res.json({ message: 'Logged in successfully', token });
//   } else {
//     res.status(403).json({ message: 'Invalid username or password' });
//   }
// });

// app.post('/admin/courses', authenticateJwt, async (req, res) => {
//   const course = new Course(req.body);
//   await course.save();
//   res.json({ message: 'Course created successfully', courseId: course.id });
// });

// app.put('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
//   const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
//   if (course) {
//     res.json({ message: 'Course updated successfully' });
//   } else {
//     res.status(404).json({ message: 'Course not found' });
//   }
// });

// app.get('/admin/courses', authenticateJwt, async (req, res) => {
//   const courses = await Course.find({});
//   res.json({ courses });
// });

// // User routes
// app.post('/users/signup', async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });
//   if (user) {
//     res.status(403).json({ message: 'User already exists' });
//   } else {
//     const newUser = new User({ username, password });
//     await newUser.save();
//     const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
//     res.json({ message: 'User created successfully', token });
//   }
// });

// app.post('/users/login', async (req, res) => {
//   const { username, password } = req.headers;
//   const user = await User.findOne({ username, password });
//   if (user) {
//     const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
//     res.json({ message: 'Logged in successfully', token });
//   } else {
//     res.status(403).json({ message: 'Invalid username or password' });
//   }
// });

// app.get('/users/courses', authenticateJwt, async (req, res) => {
//   const courses = await Course.find({published: true});
//   res.json({ courses });
// });

// app.post('/users/courses/:courseId', authenticateJwt, async (req, res) => {
//   const course = await Course.findById(req.params.courseId);
//   console.log(course);
//   if (course) {
//     const user = await User.findOne({ username: req.user.username });
//     if (user) {
//       user.purchasedCourses.push(course);
//       await user.save();
//       res.json({ message: 'Course purchased successfully' });
//     } else {
//       res.status(403).json({ message: 'User not found' });
//     }
//   } else {
//     res.status(404).json({ message: 'Course not found' });
//   }
// });

// app.get('/users/purchasedCourses', authenticateJwt, async (req, res) => {
//   const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
//   if (user) {
//     res.json({ purchasedCourses: user.purchasedCourses || [] });
//   } else {
//     res.status(403).json({ message: 'User not found' });
//   }
// });

// app.listen(3000, () => console.log('Server running on port 3000'));
