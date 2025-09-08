const mongoose = require('mongoose');
require('dotenv').config();

// Question Schema (same as in server.js)
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

// Sample seed data
const sampleQuestions = [
  {
    contributorName: "Amit Sharma",
    companyName: "Google",
    question: "Implement a function to reverse a linked list iteratively and recursively.",
    topic: "DSA",
    difficulty: "Medium",
    askedDate: new Date('2024-01-15')
  },
  {
    contributorName: "Priya Singh",
    companyName: "Microsoft",
    question: "Explain the difference between clustered and non-clustered indexes.",
    topic: "DBMS",
    difficulty: "Medium",
    askedDate: new Date('2024-01-14')
  },
  {
    contributorName: "Rahul Kumar",
    companyName: "Amazon",
    question: "Tell me about a time when you had to work under pressure.",
    topic: "HR",
    difficulty: "Easy",
    askedDate: new Date('2024-01-13')
  },
  {
    contributorName: "Sneha Patel",
    companyName: "Netflix",
    question: "Design a URL shortener like bit.ly. Discuss the architecture.",
    topic: "System Design",
    difficulty: "Hard",
    askedDate: new Date('2024-01-12')
  },
  {
    contributorName: "Vikash Gupta",
    companyName: "Meta",
    question: "What is the difference between process and thread?",
    topic: "OS",
    difficulty: "Easy",
    askedDate: new Date('2024-01-11')
  },
  {
    contributorName: "Anita Das",
    companyName: "Apple",
    question: "Implement a binary search algorithm and discuss its time complexity.",
    topic: "DSA",
    difficulty: "Easy",
    askedDate: new Date('2024-01-10')
  },
  {
    contributorName: "Karthik Raj",
    companyName: "Google",
    question: "Explain ACID properties in database transactions.",
    topic: "DBMS",
    difficulty: "Medium",
    askedDate: new Date('2024-01-09')
  },
  {
    contributorName: "Pooja Verma",
    companyName: "Uber",
    question: "What are your salary expectations?",
    topic: "HR",
    difficulty: "Easy",
    askedDate: new Date('2024-01-08')
  },
  {
    contributorName: "Ravi Teja",
    companyName: "Spotify",
    question: "Design a chat application like WhatsApp.",
    topic: "System Design",
    difficulty: "Hard",
    askedDate: new Date('2024-01-07')
  },
  {
    contributorName: "Nisha Reddy",
    companyName: "LinkedIn",
    question: "Explain polymorphism with real-world examples.",
    topic: "OOP",
    difficulty: "Medium",
    askedDate: new Date('2024-01-06')
  },
  {
    contributorName: "Arjun Mehta",
    companyName: "Flipkart",
    question: "What is virtual memory and how does it work?",
    topic: "OS",
    difficulty: "Medium",
    askedDate: new Date('2024-01-05')
  },
  {
    contributorName: "Divya Agarwal",
    companyName: "Zomato",
    question: "Implement a function to find the longest palindromic substring.",
    topic: "DSA",
    difficulty: "Hard",
    askedDate: new Date('2024-01-04')
  },
  {
    contributorName: "Suresh Babu",
    companyName: "Paytm",
    question: "What is the difference between GET and POST methods?",
    topic: "Web Development",
    difficulty: "Easy",
    askedDate: new Date('2024-01-03')
  },
  {
    contributorName: "Kavya Joshi",
    companyName: "Swiggy",
    question: "Explain the concept of overfitting in machine learning.",
    topic: "Machine Learning",
    difficulty: "Medium",
    askedDate: new Date('2024-01-02')
  },
  {
    contributorName: "Manoj Singh",
    companyName: "TCS",
    question: "Why do you want to work for our company?",
    topic: "HR",
    difficulty: "Easy",
    askedDate: new Date('2024-01-01')
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cracked-interviews', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Question.deleteMany({});
    console.log('🗑️  Cleared existing questions');

    // Insert sample data
    await Question.insertMany(sampleQuestions);
    console.log(`✅ Inserted ${sampleQuestions.length} sample questions`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();