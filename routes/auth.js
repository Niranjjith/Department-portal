const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const ADMIN_EMAIL = 'admin@college.edu';
const ADMIN_PASSWORD = 'admin123';


function isAdmin(req, res, next) {
  if (req.session.user?.role === 'admin') return next();
  res.redirect('/login');
}

//------------------------ Routes-----------

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, semester } = req.body;

    // Check if email is used by admin
    const adminUser = await User.findOne({ role: 'admin' });
    if (adminUser && (adminUser.email === email || email === ADMIN_EMAIL)) {
      return res.send('Admin email is reserved.');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send('User already registered with this email.');
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hash,
      role: 'student',
      semester,
    });

    req.session.user = newUser;
    res.redirect('/student');

  } catch (err) {
    console.error(err);
    res.send('Error occurred during signup');
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check for admin in database first
  const adminUser = await User.findOne({ email, role: 'admin' });
  if (adminUser) {
    if (await bcrypt.compare(password, adminUser.password)) {
      req.session.user = adminUser;
      return res.redirect('/admin');
    }
  }

  // Fallback to hardcoded admin for backward compatibility
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // Create admin user in database if doesn't exist
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (!existingAdmin) {
      const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
      const newAdmin = await User.create({
        name: 'Admin',
        email: ADMIN_EMAIL,
        password: hash,
        role: 'admin'
      });
      req.session.user = newAdmin;
    } else {
      req.session.user = { name: 'Admin', email: ADMIN_EMAIL, role: 'admin' };
    }
    return res.redirect('/admin');
  }

  const user = await User.findOne({ email });

  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = user;

    if (user.role === 'student') {
      return res.redirect('/student');
    } else if (user.role === 'teacher') {
      return res.redirect('/teacher');
    } else if (user.role === 'admin') {
      return res.redirect('/admin');
    } else {
      return res.send('Unknown role. Cannot redirect.');
    }

  } else {
  res.render('login', { 
      errorMessage: 'Email or password is incorrect.',
      email: email 
    });
  }
});


router.get('/teacher', (req, res) => {
  if (req.session.user?.role === 'teacher') {
    res.render('teacher-dashboard', { user: req.session.user });
  } else {
    res.redirect('/login');
  }
});



const Note = require('../models/Notes');
const Notice = require('../models/Notice');


router.get('/student', async (req, res) => {
  if (req.session.user?.role === 'student') {
    const semester = req.session.user.semester;

    const notes = await Note.find({ semester }).lean();      
    const notices = await Notice.find().lean();              

    res.render('student-dashboard', {
      user: req.session.user,
      notes,
      notices
    });
  } else {
    res.redirect('/login');
  }
});



const Notes = require('../models/Notes'); 

router.get('/student-notes-view', async (req, res) => {
  try {
    const notes = await Notes.find(); 
    res.render('student-notes-view', { notes });
  } catch (err) {
    console.error(err);
    res.send('Failed to load notes');
  }
});


// -------------------Admin middleware---------------

function isAdmin(req, res, next) {
  if (req.session.user?.role === 'admin') return next();
  res.redirect('/login');
}

module.exports = router;


//----------------------- Admin -dashboard page------------------------

router.get('/admin', isAdmin, async (req, res) => {
  try {
 
    const selectedSemester = req.query.semester || '';


    let studentQuery = { role: 'student' };


    if (selectedSemester && ['1','2','3','4','5','6'].includes(selectedSemester)) {
      studentQuery.semester = selectedSemester;
    }


    const students = await User.find(studentQuery).lean();

    const teachers = await User.find({ role: 'teacher' }).lean();

    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalTeachers = teachers.length;


    const allStudents = await User.find({ role: 'student' }).lean();
    const semesterCounts = allStudents.reduce((acc, s) => {
      const sem = s.semester || 'N/A';
      acc[sem] = (acc[sem] || 0) + 1;
      return acc;
    }, {});

    // Get admin user info
    const adminUser = await User.findOne({ role: 'admin' }).lean();
    const adminInfo = adminUser || { 
      email: req.session.user?.email || ADMIN_EMAIL, 
      name: req.session.user?.name || 'Admin' 
    };

    res.render('admin-dashboard', {
      students,
      teachers,
      totalStudents,
      totalTeachers,
      semesterCounts,
      selectedSemester,
      adminInfo,
      showSettings: false
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// -----------------------------Add Student ------------------------------


router.get('/admin/add-student', isAdmin, (req, res) => {
  res.render('add-student');
});


router.post('/admin/add-student', isAdmin, async (req, res) => {
  try {
    const { name, email, password, semester } = req.body;


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send('User with this email already exists.');
    }

    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hash,
      role: 'student',
      semester,
    });

    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.send('Error adding student');
  }
});

// --------------------Add Teacher -----------

router.get('/admin/add-teacher', isAdmin, (req, res) => {
  res.render('add-teacher');
});

//------------------------- Add Teacher -------------------------

router.post('/admin/add-teacher', isAdmin, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ----------------check if user exists-------------


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send('User with this email already exists.');
    }

    //------------ Hash password--------------

    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hash,
      role: 'teacher',
      
    });

    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.send('Error adding teacher');
  }
});

//---------------- Edit Student ------------------

router.get('/admin/edit-student/:id', isAdmin, async (req, res) => {
  const student = await User.findById(req.params.id).lean();
  if (!student || student.role !== 'student') {
    return res.redirect('/admin');
  }
  res.render('edit-student', { student });
});

//---------------- Edit Student -------------------

router.post('/admin/edit-student/:id', isAdmin, async (req, res) => {
  const { name, email, semester } = req.body;
  await User.findByIdAndUpdate(req.params.id, { name, email, semester });
  res.redirect('/admin');
});

// ---------------------Delete Student----------------


router.post('/admin/delete-student/:id', isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect('/admin');
});


//-------------------------- Edit Teacher -----------------------------


router.get('/admin/edit-teacher/:id', isAdmin, async (req, res) => {
  const teacher = await User.findById(req.params.id).lean();
  if (!teacher || teacher.role !== 'teacher') {
    return res.redirect('/admin');
  }
  res.render('edit-teacher', { teacher });
});

// -----------------------Edit Teacher - POST update----------------------

router.post('/admin/edit-teacher/:id', isAdmin, async (req, res) => {
  const { name, email } = req.body;
  await User.findByIdAndUpdate(req.params.id, { name, email });
  res.redirect('/admin');
});

//--------------------------- Delete Teacher---------------------

router.post('/admin/delete-teacher/:id', isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect('/admin');
});

//--------------------------- Admin Settings - Change Credentials ---------------------

router.get('/admin/settings', isAdmin, async (req, res) => {
  try {
    const adminUser = await User.findOne({ role: 'admin' }).lean();
    res.render('admin-dashboard', {
      students: [],
      teachers: [],
      totalStudents: 0,
      totalTeachers: 0,
      selectedSemester: '',
      showSettings: true,
      adminUser: adminUser || { email: ADMIN_EMAIL, name: 'Admin' }
    });
  } catch (err) {
    console.error(err);
    res.redirect('/admin');
  }
});

router.post('/admin/change-email', isAdmin, async (req, res) => {
  try {
    const { newEmail, currentPassword } = req.body;
    
    if (!newEmail || !currentPassword) {
      return res.json({ success: false, message: 'All fields are required' });
    }

    // Find admin user
    let adminUser = await User.findOne({ role: 'admin' });
    
    // Verify current password
    let passwordValid = false;
    if (adminUser) {
      passwordValid = await bcrypt.compare(currentPassword, adminUser.password);
    } else {
      // Fallback to hardcoded password
      passwordValid = (currentPassword === ADMIN_PASSWORD);
    }

    if (!passwordValid) {
      return res.json({ success: false, message: 'Current password is incorrect' });
    }

    // Check if new email is already taken
    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists && emailExists.role !== 'admin') {
      return res.json({ success: false, message: 'Email already in use' });
    }

    // Update admin email
    if (adminUser) {
      adminUser.email = newEmail;
      await adminUser.save();
    } else {
      // Create admin user if doesn't exist
      const hash = await bcrypt.hash(currentPassword, 10);
      adminUser = await User.create({
        name: 'Admin',
        email: newEmail,
        password: hash,
        role: 'admin'
      });
    }

    // Update session
    req.session.user = adminUser;
    
    res.json({ success: true, message: 'Email updated successfully' });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: 'Error updating email' });
  }
});

router.post('/admin/change-password', isAdmin, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.json({ success: false, message: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.json({ success: false, message: 'New passwords do not match' });
    }

    if (newPassword.length < 6) {
      return res.json({ success: false, message: 'Password must be at least 6 characters' });
    }

    // Find admin user
    let adminUser = await User.findOne({ role: 'admin' });
    
    // Verify current password
    let passwordValid = false;
    if (adminUser) {
      passwordValid = await bcrypt.compare(currentPassword, adminUser.password);
    } else {
      // Fallback to hardcoded password
      passwordValid = (currentPassword === ADMIN_PASSWORD);
    }

    if (!passwordValid) {
      return res.json({ success: false, message: 'Current password is incorrect' });
    }

    // Update password
    const hash = await bcrypt.hash(newPassword, 10);
    if (adminUser) {
      adminUser.password = hash;
      await adminUser.save();
    } else {
      // Create admin user if doesn't exist
      adminUser = await User.create({
        name: 'Admin',
        email: ADMIN_EMAIL,
        password: hash,
        role: 'admin'
      });
    }

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: 'Error updating password' });
  }
});

//---------------Connection of the resume builder------------------------

router.get('/resume-builder', (req, res) => {
  res.render('resumeBuilder'); 
});

module.exports = router;
