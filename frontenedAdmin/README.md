# MERN Stack Course Selling Website [Live Demo](https://course-selling-app-client.onrender.com "Live Demo")


## Features
- Role-Based Authentication:
    - Users can access features specific to their roles.
- Admin Section
    - Add Course
    - List All Courses
    - Delete Courses
    - Edit Courses
    - Logout
- Admin (Teacher) Features
    - Create, edit, and delete their own courses.
    - View courses created by others but cannot modify them.
    - Signup requires a secret key for authentication.
- SuperUser Features
    - Manage admins and their courses.
    - View and delete user details.
    - Requires a secret key during signup for secure validation.
- User Features
    - Browse and purchase courses.
    - View purchased courses (frontend pending).
    - Enhanced Security
    - JWT tokens with role-based claims.
    - Secret keys for SuperUser and Admin signup.
    - Environment variables for sensitive data.
## Frontend Progress- Backened Done
- Admin Panel: Created to manage admin tasks.
- SuperUser and User Dashboards: Work in progress - some part yet to be developed.


## Bug Fixes
- Bug Fix-Fix Delete Function
- Bug Fix- Login Page
- Bug Fix - Edit Course section
- Bug Fix- Price is not showing due to invalid type
- UI Improvement - Added A favicon
- Website name changes to Koodle and APlly FontStyle -Rancho
- states are managed efficiently
- Bug Fix - useroleRedirect Hooks Fixed the protected Route frontened side


# Installation Instructions
- 1.Clone the Repository
-     - git clone https://github.com/your-repo/koodle-rbac
-     - cd koodle-rbac
  2. Install Dependencies
  3. Environment Variables-Create a .env file with the following variables:
     - JWT_SECRET=<your_jwt_secret>
     - JWT_SECRET_ADMIN=<your_admin_secret>
     - JWT_SECRET_SUPERUSER=<your_superuser_secret>
     - MONGO_URI=<your_mongodb_connection_string>
  4. Run the server
     - npm start

## Frontend
  ### Admin Side-Client
      - Created Login/Signup
      - Created A Landing Page Admin Sign Up, Sign In Button
      - Created AppBar Header Section- Show Course,Add Courses,Logout Button EmailId
      - Created Courses Section-To Fetch All Courses From MONGODB of Admin
      - created Add Course Component- To Add the course in DB.
      - Created Course Component to show Detail of Course and Where Admin Can click on Edit Button to see course Details
      - Created GrayTopper To show the Title of Course
      - Created Course Card Component to see the course Details When Admin update the courses.
      - Set Updated the course To the DB and Fetch the details using API
      - Created Delete Button Course Option in each course to delete Course from DB
      - Set MUI Loader  while Fetching the data from DB 
### User-Client
     - User Signup/ Signin implemented
     - created components Mycourses,Courses 
     - created billing info
### Super User
    - Login Sighup route is created
