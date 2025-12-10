# MediaHub2

A comprehensive Learning Management System (LMS) platform designed for educational institutions. MediaHub2 facilitates seamless communication and resource sharing between administrators, teachers, and students.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [User Roles](#user-roles)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🔐 Authentication & Authorization
- Secure user registration and login system
- Role-based access control (Admin, Teacher, Student)
- Session management with MongoDB store
- Password hashing with bcrypt

### 👨‍🎓 Student Features
- Personalized dashboard with semester-based content
- View and download study notes filtered by semester
- Access to important notices and announcements
- Messaging system for communication
- Resume builder tool

### 👨‍🏫 Teacher Features
- Dedicated teacher dashboard
- Upload study materials and notes
- Manage course content by semester and subject
- View student interactions

### 👨‍💼 Admin Features
- Comprehensive admin dashboard
- Manage students and teachers (CRUD operations)
- Filter students by semester
- View statistics (total students, teachers, semester-wise distribution)
- Upload and manage notices
- Monitor system activity

### 📚 Content Management
- Upload notes with metadata (title, semester, subject, category)
- File upload support (PDF, documents, etc.)
- Filter and search notes by semester, subject, and category
- Notice board system
- Organized file storage system

## 🛠 Tech Stack

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Template Engine**: EJS (Embedded JavaScript)
- **Authentication**: Express Sessions with MongoDB store
- **File Upload**: Multer
- **Password Hashing**: bcryptjs
- **Environment Variables**: dotenv
- **Deployment**: Vercel

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas account)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MediaHub2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_secret_session_key
   PORT=3000
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/mediahub2
# Or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mediahub2

# Session Secret (use a strong random string)
SESSION_SECRET=your-super-secret-session-key-change-this

# Server Port (optional, defaults to 3000)
PORT=3000
```

### Default Admin Credentials

- **Email**: `admin@college.edu`
- **Password**: `admin123`

⚠️ **Important**: Change these credentials in production! Update them in `routes/auth.js`.

## 📖 Usage

### For Students

1. **Sign Up**: Create an account with your email, name, and semester
2. **Login**: Access your personalized dashboard
3. **View Notes**: Browse notes filtered by your semester
4. **View Notices**: Stay updated with announcements
5. **Send Messages**: Communicate with administrators

### For Teachers

1. **Login**: Use credentials provided by admin
2. **Upload Notes**: Share study materials with students
3. **Manage Content**: Organize notes by semester, subject, and category

### For Administrators

1. **Login**: Use default admin credentials
2. **Manage Users**: Add, edit, or delete students and teachers
3. **Upload Notices**: Post important announcements
4. **Monitor System**: View statistics and manage content

## 📁 Project Structure

```
MediaHub2/
├── api/
│   └── server.js          # Vercel serverless function entry point
├── models/
│   ├── User.js            # User model (students, teachers, admins)
│   ├── Notes.js           # Notes/study materials model
│   ├── Notice.js          # Notices/announcements model
│   ├── Message.js         # Messages model
│   └── Upload.js          # Upload model
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── student.js         # Student-specific routes
│   ├── uploadNote.js      # Note upload and management
│   ├── Notice.js          # Notice management
│   ├── messages.js        # Messaging routes
│   ├── guide.js           # Guide/help routes
│   └── contact.js         # Contact routes
├── views/
│   ├── index.ejs          # Home page
│   ├── login.ejs          # Login page
│   ├── signup.ejs         # Registration page
│   ├── student-dashboard.ejs
│   ├── teacher-dashboard.ejs
│   ├── admin-dashboard.ejs
│   └── ...                # Other view templates
├── public/
│   ├── css/               # Stylesheets
│   ├── images/            # Image assets
│   ├── uploads/           # Uploaded files
│   │   └── notes/         # Study notes storage
│   └── videos/            # Video files
├── app.js                 # Express app configuration
├── server.js              # Local development server
├── package.json           # Dependencies and scripts
├── vercel.json            # Vercel deployment configuration
└── README.md              # This file
```

## 🛣 API Routes

### Authentication Routes
- `GET /` - Home page
- `GET /login` - Login page
- `POST /login` - User login
- `GET /signup` - Registration page
- `POST /signup` - User registration
- `GET /student` - Student dashboard
- `GET /teacher` - Teacher dashboard
- `GET /admin` - Admin dashboard

### Student Routes
- `GET /student` - Student dashboard with notes and notices
- `GET /student-notes-view` - View all notes

### Admin Routes
- `GET /admin` - Admin dashboard
- `GET /admin/add-student` - Add student form
- `POST /admin/add-student` - Create new student
- `GET /admin/edit-student/:id` - Edit student form
- `POST /admin/edit-student/:id` - Update student
- `POST /admin/delete-student/:id` - Delete student
- `GET /admin/add-teacher` - Add teacher form
- `POST /admin/add-teacher` - Create new teacher
- `GET /admin/edit-teacher/:id` - Edit teacher form
- `POST /admin/edit-teacher/:id` - Update teacher
- `POST /admin/delete-teacher/:id` - Delete teacher

### Notes Routes
- `GET /upload-note` - Upload note form
- `POST /upload-note` - Upload new note
- `GET /uploads` - View all uploads (with filters)
- `POST /delete-note/:id` - Delete note

### Other Routes
- `GET /guide` - User guide/help page
- `GET /resume-builder` - Resume builder tool
- `GET /message` - Messaging interface

## 👥 User Roles

### Admin
- Full system access
- Manage all users (students and teachers)
- Upload and manage notices
- View system statistics

### Teacher
- Upload study materials
- Manage course content
- View student interactions

### Student
- View notes for their semester
- Access notices
- Send messages
- Use resume builder

## 🚢 Deployment

### Deploy to Vercel

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables**
   - Go to your Vercel project settings
   - Add `MONGO_URI` and `SESSION_SECRET` in the Environment Variables section

4. **Configure MongoDB Atlas** (if using cloud database)
   - Whitelist Vercel's IP addresses or use `0.0.0.0/0` for all IPs
   - Update connection string in environment variables

### Manual Deployment

1. Set up a Node.js hosting service (Heroku, DigitalOcean, etc.)
2. Configure environment variables
3. Ensure MongoDB is accessible
4. Run `npm install` and `npm start`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🔒 Security Notes

- Always change default admin credentials in production
- Use strong session secrets
- Keep MongoDB connection strings secure
- Regularly update dependencies
- Implement rate limiting for production
- Use HTTPS in production environments

## 📞 Support

For issues, questions, or contributions, please open an issue on the repository.

---

**Made with ❤️ for educational institutions**

#   D e p a r t m e n t - p o r t a l  
 