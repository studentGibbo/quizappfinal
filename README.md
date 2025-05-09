# Basketball Quiz App
A dynamic quiz app with user authentication designed to generate a series of 100 questions until it runs out. Users are able to register, or log into their existing account to begin the quiz. The questions are divided amongst difficulty: easy (1), medium(2), and hard (3).

## Prerequisites
Before running this application, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (running locally or a MongoDB Atlas account)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/studentGibbo/quizappfinal.git
cd quizappfinal
```

2. Install dependencies:
```bash
npm install
```

3. Set up MongoDB:
   - Make sure MongoDB is running locally, or
   - Update the MongoDB connection string in `app.js` if using MongoDB Atlas

4. Seed the database (optional):
```bash
node seed.js
```

## Running the Application

1. Start the server:
```bash
node app.js
```

2. Open your web browser and navigate to:
```
http://localhost:3000
```

## Dependencies
The application uses the following main dependencies:
- express: Web framework
- mongoose: MongoDB object modeling
- ejs: Template engine
- bcryptjs: Password hashing
- express-session: Session management

=======
# quizappfinal
new project repo because old one did not work
