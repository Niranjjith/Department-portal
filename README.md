# MediaHub2

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-2C3E50?style=for-the-badge&logo=ejs&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)

**A comprehensive Learning Management System (LMS) platform designed for educational institutions**

MediaHub2 facilitates seamless communication and resource sharing between administrators, teachers, and students through an intuitive web-based interface.

[Features](#-features) • [Installation](#-installation) • [Documentation](#-documentation) • [Deployment](#-deployment)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Routes](#-api-routes)
- [User Roles](#-user-roles)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Security](#-security-notes)
- [License](#-license)

---

## ✨ Features

### 🔐 Authentication & Authorization
- ✅ Secure user registration and login system
- ✅ Role-based access control (Admin, Teacher, Student)
- ✅ Session management with MongoDB store
- ✅ Password hashing with bcrypt
- ✅ Protected routes and middleware

### 👨‍🎓 Student Features
- 📚 Personalized dashboard with semester-based content
- 📖 View and download study notes filtered by semester
- 📢 Access to important notices and announcements
- 💬 Messaging system for communication
- 📄 Resume builder tool
- 🔍 Search and filter capabilities

### 👨‍🏫 Teacher Features
- 🎯 Dedicated teacher dashboard
- 📤 Upload study materials and notes
- 📝 Manage course content by semester and subject
- 👥 View student interactions
- 📊 Content organization tools

### 👨‍💼 Admin Features
- 🛠️ Comprehensive admin dashboard
- 👤 Manage students and teachers (CRUD operations)
- 🔍 Filter students by semester
- 📈 View statistics (total students, teachers, semester-wise distribution)
- 📢 Upload and manage notices
- 📊 Monitor system activity
- ⚙️ System configuration

### 📚 Content Management
- 📎 Upload notes with metadata (title, semester, subject, category)
- 📄 File upload support (PDF, documents, etc.)
- 🔍 Filter and search notes by semester, subject, and category
- 📋 Notice board system
- 📁 Organized file storage system
- 🗂️ Category-based organization

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Runtime** | Node.js |
| **Backend Framework** | Express.js |
| **Database** | MongoDB with Mongoose ODM |
| **Template Engine** | EJS (Embedded JavaScript) |
| **Authentication** | Express Sessions with MongoDB store |
| **File Upload** | Multer |
| **Password Hashing** | bcryptjs |
| **Environment Variables** | dotenv |
| **Deployment** | Vercel |

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** - [Download](https://www.mongodb.com/) (local installation) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd MediaHub2
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Environment Configuration

Create a `.env` file in the root directory:

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

### Step 4: Start the Development Server

```bash
npm start
```

### Step 5: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGO_URI` | MongoDB connection string | ✅ Yes | - |
| `SESSION_SECRET` | Secret key for session encryption | ✅ Yes | - |
| `PORT` | Server port number | ❌ No | `3000` |

### Default Admin Credentials

**⚠️ IMPORTANT: Change these credentials in production!**

- **Email**: `admin@college.edu`
- **Password**: `admin123`

To update admin credentials, modify the authentication logic in `routes/auth.js`.

---

## 📖 Usage

### For Students

1. **Sign Up**: Create an account with your email, name, and semester
2. **Login**: Access your personalized dashboard
3. **View Notes**: Browse notes filtered by your semester
4. **View Notices**: Stay updated with announcements
5. **Send Messages**: Communicate with administrators
6. **Build Resume**: Use the resume builder tool

### For Teachers

1. **Login**: Use credentials provided by admin
2. **Upload Notes**: Share study materials with students
3. **Manage Content**: Organize notes by semester, subject, and category
4. **View Dashboard**: Monitor your uploaded content

### For Administrators

1. **Login**: Use default admin credentials (change in production!)
2. **Manage Users**: Add, edit, or delete students and teachers
3. **Upload Notices**: Post important announcements
4. **Monitor System**: View statistics and manage content
5. **System Configuration**: Configure system settings

---

## 📁 Project Structure

```
MediaHub2/
├── api/
│   └── server.js              # Vercel serverless function entry point
├── models/
│   ├── User.js                # User model (students, teachers, admins)
│   ├── Notes.js               # Notes/study materials model
│   ├── Notice.js              # Notices/announcements model
│   ├── Message.js             # Messages model
│   └── Upload.js              # Upload model
├── routes/
│   ├── auth.js                # Authentication routes
│   ├── student.js             # Student-specific routes
│   ├── uploadNote.js          # Note upload and management
│   ├── Notice.js              # Notice management
│   ├── messages.js            # Messaging routes
│   ├── guide.js               # Guide/help routes
│   └── contact.js             # Contact routes
├── views/
│   ├── index.ejs              # Home page
│   ├── login.ejs              # Login page
│   ├── signup.ejs             # Registration page
│   ├── student-dashboard.ejs  # Student dashboard
│   ├── teacher-dashboard.ejs  # Teacher dashboard
│   ├── admin-dashboard.ejs    # Admin dashboard
│   ├── upload-note.ejs        # Note upload form
│   ├── upload-notice.ejs      # Notice upload form
│   ├── message.ejs            # Messaging interface
│   ├── guide.ejs              # User guide
│   ├── resumeBuilder.ejs      # Resume builder
│   └── ...                    # Other view templates
├── public/
│   ├── css/                   # Stylesheets
│   │   ├── style.css
│   │   ├── login.css
│   │   └── signup.css
│   ├── images/                # Image assets
│   ├── uploads/                # Uploaded files
│   │   └── notes/             # Study notes storage
│   └── videos/                 # Video files
├── app.js                      # Express app configuration
├── server.js                   # Local development server
├── package.json                # Dependencies and scripts
├── vercel.json                 # Vercel deployment configuration
├── .env                        # Environment variables (create this)
└── README.md                   # This file
```

---

## 🛣 API Routes

### Authentication Routes

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/` | Home page |
| `GET` | `/login` | Login page |
| `POST` | `/login` | User login |
| `GET` | `/signup` | Registration page |
| `POST` | `/signup` | User registration |
| `GET` | `/student` | Student dashboard |
| `GET` | `/teacher` | Teacher dashboard |
| `GET` | `/admin` | Admin dashboard |

### Student Routes

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/student` | Student dashboard with notes and notices |
| `GET` | `/student-notes-view` | View all notes |

### Admin Routes

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/admin` | Admin dashboard |
| `GET` | `/admin/add-student` | Add student form |
| `POST` | `/admin/add-student` | Create new student |
| `GET` | `/admin/edit-student/:id` | Edit student form |
| `POST` | `/admin/edit-student/:id` | Update student |
| `POST` | `/admin/delete-student/:id` | Delete student |
| `GET` | `/admin/add-teacher` | Add teacher form |
| `POST` | `/admin/add-teacher` | Create new teacher |
| `GET` | `/admin/edit-teacher/:id` | Edit teacher form |
| `POST` | `/admin/edit-teacher/:id` | Update teacher |
| `POST` | `/admin/delete-teacher/:id` | Delete teacher |

### Notes Routes

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/upload-note` | Upload note form |
| `POST` | `/upload-note` | Upload new note |
| `GET` | `/uploads` | View all uploads (with filters) |
| `POST` | `/delete-note/:id` | Delete note |

### Other Routes

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/guide` | User guide/help page |
| `GET` | `/resume-builder` | Resume builder tool |
| `GET` | `/message` | Messaging interface |

---

## 👥 User Roles

### 🔴 Admin
- Full system access and control
- Manage all users (students and teachers)
- Upload and manage notices
- View system statistics and analytics
- System configuration and settings

### 🟡 Teacher
- Upload study materials and notes
- Manage course content by semester and subject
- View student interactions and engagement
- Organize content with categories

### 🟢 Student
- View notes filtered by their semester
- Access notices and announcements
- Send messages to administrators
- Use resume builder tool
- Download study materials

---

## 🚢 Deployment

### Deploy to Vercel

#### Option 1: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add the following:
     - `MONGO_URI`: Your MongoDB connection string
     - `SESSION_SECRET`: Your session secret key

5. **Configure MongoDB Atlas** (if using cloud database)
   - Go to MongoDB Atlas → Network Access
   - Add IP address `0.0.0.0/0` (all IPs) or Vercel's specific IPs
   - Update connection string in environment variables

#### Option 2: Using Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in Vercel
3. Configure environment variables
4. Deploy

### Manual Deployment

1. **Set up a Node.js hosting service** (Heroku, DigitalOcean, AWS, etc.)
2. **Configure environment variables** in your hosting platform
3. **Ensure MongoDB is accessible** from your hosting platform
4. **Run deployment commands**:
   ```bash
   npm install
   npm start
   ```

### Production Checklist

- [ ] Change default admin credentials
- [ ] Use strong session secret
- [ ] Configure MongoDB with proper access controls
- [ ] Enable HTTPS/SSL
- [ ] Set up proper error logging
- [ ] Configure rate limiting
- [ ] Set up backup strategy for database
- [ ] Review and update dependencies
- [ ] Configure CORS if needed
- [ ] Set up monitoring and alerts

---

## 🔧 Troubleshooting

### Common Issues

#### MongoDB Connection Error
```
❌ MongoDB connection error: ...
```
**Solution**: 
- Verify your `MONGO_URI` in `.env` file
- Check if MongoDB is running (for local installation)
- Verify network access for MongoDB Atlas

#### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution**: 
- Change the `PORT` in `.env` file
- Or kill the process using port 3000:
  ```bash
  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  
  # Linux/Mac
  lsof -ti:3000 | xargs kill
  ```

#### Session Not Working
**Solution**: 
- Ensure `SESSION_SECRET` is set in `.env`
- Check MongoDB connection (sessions are stored in MongoDB)
- Clear browser cookies and try again

#### File Upload Issues
**Solution**: 
- Check `public/uploads/` directory exists
- Verify write permissions on the uploads directory
- Check file size limits in Multer configuration

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Make your changes**
4. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
5. **Push to the branch** (`git push origin feature/AmazingFeature`)
6. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write clear commit messages
- Test your changes thoroughly
- Update documentation if needed
- Ensure all tests pass (if applicable)

---

## 🔒 Security Notes

### Production Security Checklist

- ✅ **Change default admin credentials** - Never use default credentials in production
- ✅ **Use strong session secrets** - Generate a random, complex string
- ✅ **Secure MongoDB connection** - Use authentication and restrict network access
- ✅ **Keep dependencies updated** - Regularly run `npm audit` and update packages
- ✅ **Implement rate limiting** - Prevent abuse and DDoS attacks
- ✅ **Use HTTPS** - Encrypt all traffic in production
- ✅ **Validate user input** - Sanitize and validate all user inputs
- ✅ **Secure file uploads** - Validate file types and sizes
- ✅ **Environment variables** - Never commit `.env` files to version control
- ✅ **Error handling** - Don't expose sensitive information in error messages

### Security Best Practices

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Review security advisories
npm audit --audit-level=moderate
```

---

## 📝 License

This project is licensed under the **ISC License**.

See the [LICENSE](LICENSE) file for more details.

---

## 📞 Support

For issues, questions, or contributions:

- 📧 Open an issue on the repository
- 💬 Start a discussion
- 📖 Check the documentation
- 🔍 Search existing issues

---

## 🙏 Acknowledgments

- Built with [Express.js](https://expressjs.com/)
- Database powered by [MongoDB](https://www.mongodb.com/)
- Deployed on [Vercel](https://vercel.com/)

---

<div align="center">

**Made with ❤️ for educational institutions**

⭐ Star this repo if you find it helpful!

</div>
