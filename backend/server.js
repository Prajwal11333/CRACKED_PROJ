const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Question Schema
const questionSchema = new mongoose.Schema({
  contributorName: {
    type: String,
    required: true,
    trim: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  question: {
    type: String,
    required: true,
    trim: true
  },
  topic: {
    type: String,
    required: true,
    enum: ['DSA', 'DBMS', 'OS', 'HR', 'System Design', 'OOP', 'Web Development', 'Machine Learning']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard']
  },
  askedDate: {
    type: Date,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Question = mongoose.model('Question', questionSchema);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cracked-interviews', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// API Routes

const JWT_SECRET = process.env.JWT_SECRET || 'change_me';

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid authentication'
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid authentication'
    });
  }
};

const createToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });
};

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = createToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
});

app.get('/api/auth/me', authenticate, async (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    }
  });
});

// 1. POST /questions - Add a new interview question
app.post('/api/questions', authenticate, async (req, res) => {
  try {
    const { companyName, question, topic, difficulty, askedDate } = req.body;
    
    if (!companyName || !question || !topic || !difficulty || !askedDate) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    const newQuestion = new Question({
      contributorName: req.user.name,
      companyName,
      question,
      topic,
      difficulty,
      askedDate: new Date(askedDate),
      userId: req.user._id
    });

    const savedQuestion = await newQuestion.save();
    
    res.status(201).json({
      success: true,
      message: 'Question added successfully!',
      data: {
        id: savedQuestion._id,
        companyName: savedQuestion.companyName,
        question: savedQuestion.question,
        topic: savedQuestion.topic,
        difficulty: savedQuestion.difficulty,
        askedDate: savedQuestion.askedDate,
        contributorName: savedQuestion.contributorName,
        createdAt: savedQuestion.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding question',
      error: error.message
    });
  }
});

// 2. GET /questions - Get all questions
app.get('/api/questions', async (req, res) => {
  try {
    const { company, topic, difficulty } = req.query;
    let filter = {};
    
    if (company) {
      filter.companyName = new RegExp(company, 'i');
    }
    if (topic) {
      filter.topic = topic;
    }
    if (difficulty) {
      filter.difficulty = difficulty;
    }

    const questions = await Question.find(filter)
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean();

    res.json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching questions',
      error: error.message
    });
  }
});

app.get('/api/questions/mine', authenticate, async (req, res) => {
  try {
    const questions = await Question.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean();

    res.json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user questions',
      error: error.message
    });
  }
});

app.put('/api/questions/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const questionRecord = await Question.findById(id);
    if (!questionRecord) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    if (!questionRecord.userId || questionRecord.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this question'
      });
    }

    const { companyName, question, topic, difficulty, askedDate } = req.body;

    if (companyName) {
      questionRecord.companyName = companyName;
    }
    if (question) {
      questionRecord.question = question;
    }
    if (topic) {
      questionRecord.topic = topic;
    }
    if (difficulty) {
      questionRecord.difficulty = difficulty;
    }
    if (askedDate) {
      questionRecord.askedDate = new Date(askedDate);
    }

    questionRecord.contributorName = req.user.name;

    const updatedQuestion = await questionRecord.save();

    res.json({
      success: true,
      message: 'Question updated successfully',
      data: {
        id: updatedQuestion._id,
        companyName: updatedQuestion.companyName,
        question: updatedQuestion.question,
        topic: updatedQuestion.topic,
        difficulty: updatedQuestion.difficulty,
        askedDate: updatedQuestion.askedDate,
        contributorName: updatedQuestion.contributorName,
        createdAt: updatedQuestion.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating question',
      error: error.message
    });
  }
});

app.delete('/api/questions/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const questionRecord = await Question.findById(id);
    if (!questionRecord) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    if (!questionRecord.userId || questionRecord.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this question'
      });
    }

    await questionRecord.deleteOne();

    res.json({
      success: true,
      message: 'Question deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting question',
      error: error.message
    });
  }
});

// 3. GET /questions/:companyName - Get questions for specific company
app.get('/api/questions/company/:companyName', async (req, res) => {
  try {
    const { companyName } = req.params;
    
    const questions = await Question.find({
      companyName: new RegExp(companyName, 'i')
    })
    .sort({ createdAt: -1 })
    .lean();

    res.json({
      success: true,
      company: companyName,
      count: questions.length,
      data: questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching company questions',
      error: error.message
    });
  }
});

// 4. GET /analysis - Analytics data
app.get('/api/analysis', async (req, res) => {
  try {
    // Top 5 companies with most questions
    const topCompanies = await Question.aggregate([
      {
        $group: {
          _id: '$companyName',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Question count by topic
    const topicDistribution = await Question.aggregate([
      {
        $group: {
          _id: '$topic',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Question count by difficulty
    const difficultyDistribution = await Question.aggregate([
      {
        $group: {
          _id: '$difficulty',
          count: { $sum: 1 }
        }
      }
    ]);

    // Last 5 recently added questions
    const recentQuestions = await Question.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('-__v')
      .lean();

    // Total statistics
    const totalQuestions = await Question.countDocuments();
    const totalCompanies = await Question.distinct('companyName').then(companies => companies.length);

    res.json({
      success: true,
      data: {
        totalQuestions,
        totalCompanies,
        topCompanies,
        topicDistribution,
        difficultyDistribution,
        recentQuestions
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics data',
      error: error.message
    });
  }
});

// Serve frontend pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/submit', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/submit.html'));
});

app.get('/browse', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/browse.html'));
});

app.get('/analytics', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/analytics.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Analytics: http://localhost:${PORT}/analytics`);
  console.log(`📝 Submit: http://localhost:${PORT}/submit`);
  console.log(`📚 Browse: http://localhost:${PORT}/browse`);
});