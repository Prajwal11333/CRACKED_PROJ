const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Question = mongoose.model('Question', questionSchema);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cracked-interviews', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// API Routes

// 1. POST /questions - Add a new interview question
app.post('/api/questions', async (req, res) => {
  try {
    const { contributorName, companyName, question, topic, difficulty, askedDate } = req.body;
    
    // Basic validation
    if (!contributorName || !companyName || !question || !topic || !difficulty || !askedDate) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    const newQuestion = new Question({
      contributorName,
      companyName,
      question,
      topic,
      difficulty,
      askedDate: new Date(askedDate)
    });

    const savedQuestion = await newQuestion.save();
    
    res.status(201).json({
      success: true,
      message: 'Question added successfully!',
      data: savedQuestion
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
    
    // Apply filters if provided
    if (company) {
      filter.companyName = new RegExp(company, 'i'); // Case-insensitive search
    }
    if (topic) {
      filter.topic = topic;
    }
    if (difficulty) {
      filter.difficulty = difficulty;
    }

    const questions = await Question.find(filter)
      .sort({ createdAt: -1 }) // Latest first
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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Analytics: http://localhost:${PORT}/analytics`);
  console.log(`📝 Submit: http://localhost:${PORT}/submit`);
  console.log(`📚 Browse: http://localhost:${PORT}/browse`);
});