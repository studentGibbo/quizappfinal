const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const User = require('./models/User');
const Question = require('./models/Question');

const app = express();

// Author: Gibbs Dang
// Database creation, question randomization, no repeated questions feature, user database, accuracy function, accuracy leaderboard function, displaying questions, starting server, basic routing for signups

// Connect to MongoDB
// Author: Gibbs Dang
mongoose.connect('mongodb://localhost:27017/quiz-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your secret here',
  resave: false,
  saveUninitialized: false
}));

// Root redirect
// Authors: Drew Ambrosino, Owen O'Connell, and Sophia Martinez
app.get('/', async (req, res) => {
  if (!req.session.userId) {

    try {
      const questionsByDifficulty = {
        easy: await Question.find({ difficulty: 1 }),
        medium: await Question.find({ difficulty: 2 }),
        hard: await Question.find({ difficulty: 3 })
      };

      res.render('quiz', { questionsByDifficulty });
    } catch (err) {

    console.error("Error finding questions", err);
    res.status(500).send("Server Error");

    console.log("No user in session, redirecting...")
    return res.redirect('/home');
  }
  res.redirect('/login');
 } 
});

// Signup routes
// Author: Gibbs Dang, Drew Ambrosino and Owen O'Connell
app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    req.session.userId = user._id;
    res.redirect('/home');
  } catch (e) {
    console.error(e);
    res.send('Error creating account. Maybe username is taken.');
  }
});

// Login routes
// Author: Gibbs Dang
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && user.password === password) {
    req.session.userId = user._id;
    return res.redirect('/home');
  }
  res.render('login', { error: 'Invalid credentials' });
});

// Logout
// Author: Gibbs Dang
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Home page
// Author: Gibbs Dang, Drew Ambrosino, Owen O'Connell
app.get('/home', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  const user = await User.findById(req.session.userId);
  let topPlayers = await User.find()
    .sort({ 'stats.correctCount': -1 })
    .limit(10)
    .select('username stats');

  // Add accuracy to each player
  topPlayers = topPlayers.map(u => {
    const total = u.stats.correctCount + u.stats.incorrectCount;
    const accuracy = total > 0 ? ((u.stats.correctCount / total) * 100).toFixed(2) : '0.00';
    return { ...u.toObject(), accuracy };
  });

  res.render('home', { user, topPlayers });
});

// Quiz page - display 10 random questions
// Author: Gibbs Dang
app.get('/quiz', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  // Use aggregation to get 10 random questions
  const questions = await Question.aggregate([ { $sample: { size: 10 } } ]);
  res.render('quiz', { questions });
});

// Handle quiz submission
// Author: Gibbs Dang, Michael Morris
app.post('/submit-quiz', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  const user = await User.findById(req.session.userId);
  let correctCount = 0;
  let totalCount = 0;

  // req.body contains keys like 'q_<questionId>'
  for (let key in req.body) {
    if (key.startsWith('q_')) {
      totalCount++;
      const questionId = key.slice(2);
      const question = await Question.findById(questionId);
      const selectedIndex = parseInt(req.body[key], 10);
      if (question && selectedIndex === question.correctIndex) {
        correctCount++;
      }
    }
  }

  // Update user stats
  user.stats.correctCount += correctCount;
  user.stats.incorrectCount += (totalCount - correctCount);
  await user.save();

  // Calculate accuracy percentage
  let accuracy = totalCount > 0 ? ((correctCount / totalCount) * 100).toFixed(2) : '0.00';

  res.render('results', { correct: correctCount, total: totalCount, accuracy });
});

// Start server
// Author: Gibbs Dang
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});