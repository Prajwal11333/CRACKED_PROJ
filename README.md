# Cracked - Share & Learn Interview Questions

A comprehensive platform where people who recently cracked interviews can share their questions to help beginners prepare better.

## 🚀 Features

### Backend (Node.js + Express + MongoDB)
- **RESTful API** with comprehensive endpoints
- **MongoDB Atlas** integration with Mongoose ODM
- **Question Schema** with validation
- **Analytics API** for dashboard insights
- **CORS enabled** for frontend integration
- **Sample seed data** for immediate testing

### Frontend (HTML, CSS, Vanilla JavaScript)
- **Submit Questions** - Clean form for contributors
- **Browse Questions** - Searchable table with filters
- **Analytics Dashboard** - Visual charts and statistics
- **Responsive Design** - Works on all devices
- **Modern UI** - Professional styling with animations

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account

### Quick Start

1. **Install Dependencies**
```bash
npm install
```

2. **Configure Environment**
   - Create a `.env` file in the root directory
   - Add your MongoDB Atlas connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cracked-interviews?retryWrites=true&w=majority
PORT=3000
```

3. **Seed Sample Data**
```bash
npm run seed
```

4. **Start the Application**
```bash
npm start
```
For development with auto-restart:
```bash
npm run dev
```

5. **Access the Application**
   - Home: http://localhost:3000
   - Submit Questions: http://localhost:3000/submit
   - Browse Questions: http://localhost:3000/browse
   - Analytics: http://localhost:3000/analytics

## 🎯 API Endpoints

### Questions
- `POST /api/questions` - Add new interview question
- `GET /api/questions` - Get all questions with optional filters
- `GET /api/questions/company/:companyName` - Get questions by company

### Analytics
- `GET /api/analysis` - Get comprehensive analytics data

## 🏗️ Project Structure

```
cracked-interview-questions/
├── backend/
│   ├── server.js          # Main server file
│   └── seedData.js        # Sample data seeder
├── frontend/
│   ├── index.html         # Home page
│   ├── submit.html        # Submit question page
│   ├── browse.html        # Browse questions page
│   ├── analytics.html     # Analytics dashboard
│   ├── style.css          # Comprehensive styling
│   ├── script.js          # Home page functionality
│   ├── submit.js          # Submit form handling
│   ├── browse.js          # Browse and filter logic
│   └── analytics.js       # Charts and analytics
├── package.json
├── .env                   # Environment variables
└── README.md
```

## 📊 Database Schema

```javascript
{
  contributorName: String,    // Name of the person sharing
  companyName: String,       // Company where interviewed
  question: String,          // The actual question asked
  topic: String,            // DSA, DBMS, OS, HR, etc.
  difficulty: String,       // Easy, Medium, Hard
  askedDate: Date,          // When the question was asked
  createdAt: Date          // When shared on platform
}
```

## 🎨 Features Breakdown

### Submit Questions Page
- Form validation with real-time feedback
- Topic selection (DSA, DBMS, OS, HR, etc.)
- Difficulty levels (Easy, Medium, Hard)
- Date picker with validation
- Success/error messaging

### Browse Questions Page
- Dynamic table with all questions
- Real-time search by company name
- Filter by topic and difficulty
- Question count display
- Responsive design for mobile

### Analytics Dashboard
- Total questions and companies stats
- Top 5 companies with most questions
- Topic distribution bar chart
- Difficulty distribution pie chart
- Recent questions feed
- Canvas-based visualizations

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

### Frontend
- **Vanilla JavaScript** - No frameworks
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **Canvas API** - Custom charts and visualizations
- **Responsive Design** - Mobile-first approach

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first CSS approach
- Flexible grid layouts
- Touch-friendly interactions
- Readable typography on all screen sizes
- Optimized charts for mobile viewing

## 🎯 Sample Data

The seed script includes 15 sample questions covering:
- **Companies**: Google, Microsoft, Amazon, Apple, Meta, etc.
- **Topics**: DSA, DBMS, OS, System Design, HR, etc.
- **Difficulties**: Easy, Medium, Hard
- **Real interview questions** for immediate testing

## 🚦 Usage Guide

### For Contributors
1. Visit `/submit` page
2. Fill in your interview experience
3. Select appropriate topic and difficulty
4. Submit to help others

### For Learners
1. Visit `/browse` to explore all questions
2. Use filters to find relevant questions
3. Search by company or topic
4. Check `/analytics` for trends

### For Instructors
- Perfect for classroom demonstrations
- Real data with meaningful insights
- Clean, professional interface
- Easy to extend and modify

## 🔧 Development

### Adding New Topics
Edit the topic enum in `backend/server.js`:
```javascript
enum: ['DSA', 'DBMS', 'OS', 'HR', 'YourNewTopic']
```

### Customizing Charts
Modify chart functions in `frontend/analytics.js`:
- `drawBarChart()` for topic distribution
- `drawPieChart()` for difficulty breakdown

### Styling Changes
All styles are in `frontend/style.css` with:
- CSS custom properties for theming
- Responsive breakpoints
- Animation definitions

## 📈 Future Enhancements

- User authentication and profiles
- Question rating and comments
- Advanced search with tags
- Email notifications for new questions
- Export functionality for analytics
- REST API documentation with Swagger

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your improvements
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for educational purposes.

---

**Built with ❤️ for the developer community**

Perfect for computer science classrooms, coding bootcamps, and anyone preparing for technical interviews!