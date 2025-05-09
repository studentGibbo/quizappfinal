const mongoose = require('mongoose');
const User = require('./models/User');
const Question = require('./models/Question');

// Author: Gibbs Dang, Drew Ambrosino, Owen O'Connell, Sophia Martinez, Michael Morris
// Database seeding and predefined NBA trivia questions

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/quiz-app');

    // Clear existing data
    await User.deleteMany({});
    await Question.deleteMany({});

    // Create a plain-text test user
    await User.create({
      username: 'testuser',
      password: 'test123',
      stats: { correctCount: 0, incorrectCount: 0 },
      encounteredQuestions: []
    });

    // Seed sample NBA trivia questions
    const questions = [
      { text: 'Who holds the record for the most career points in NBA history?', options: ['Michael Jordan', 'LeBron James', 'Kareem Abdul-Jabbar', 'Kobe Bryant'], correctIndex: 2, difficulty: 2 },
      { text: 'Which team won the NBA championship in 2020?', options: ['Miami Heat', 'Los Angeles Lakers', 'Boston Celtics', 'Golden State Warriors'], correctIndex: 1, difficulty: 1 },
      { text: 'Which player is nicknamed "King James"?', options: ['Stephen Curry', 'LeBron James', 'Chris Paul', 'Kyrie Irving'], correctIndex: 1, difficulty: 1 },
      { text: 'What is the standard height of an NBA basketball hoop?', options: ['9 feet', '10 feet', '11 feet', '12 feet'], correctIndex: 1, difficulty: 2 },
      { text: 'How many teams compete in the NBA Finals each year?', options: ['1', '2', '4', '16'], correctIndex: 1, difficulty: 2 },
      { text: 'Who is the NBA\'s all-time leader in assists?', options: ['John Stockton', 'Magic Johnson', 'Chris Paul', 'Steve Nash'], correctIndex: 0, difficulty: 2 },
      { text: 'Who holds the record for most career rebounds in NBA history?', options: ['Wilt Chamberlain', 'Bill Russell', 'Kareem Abdul-Jabbar', 'Shaquille O\'Neal'], correctIndex: 1, difficulty: 2 },
      { text: 'Which player has won the most NBA MVP awards?', options: ['Michael Jordan', 'Kareem Abdul-Jabbar', 'LeBron James', 'Bill Russell'], correctIndex: 1, difficulty: 2 },
      { text: 'Which team originally drafted Kobe Bryant 13th overall in 1996?', options: ['Charlotte Hornets', 'Los Angeles Lakers', 'Philadelphia 76ers', 'Miami Heat'], correctIndex: 0, difficulty: 2 },
      { text: 'Who was the second overall pick in the 2003 NBA Draft?', options: ['LeBron James', 'Darko Miličić', 'Carmelo Anthony', 'Chris Bosh'], correctIndex: 1, difficulty: 2},
      { text: 'Which coach has won the most NBA championships?', options: ['Phil Jackson', 'Red Auerbach', 'Gregg Popovich', 'Pat Riley'], correctIndex: 1, difficulty: 1},
      { text: 'Which player scored 100 points in a single NBA game?', options: ['Wilt Chamberlain', 'Kobe Bryant', 'Michael Jordan', 'Karl Malone'], correctIndex: 0, difficulty: 2},
      { text: 'Who won the NBA Rookie of the Year award in 2019?', options: ['Luka Dončić', 'Trae Young', 'Deandre Ayton', 'Zion Williamson'], correctIndex: 0, difficulty: 2 },
      { text: 'What jersey number did Michael Jordan wear with the Chicago Bulls?', options: ['23', '45', '32', '9'], correctIndex: 0, difficulty: 1 },
      { text: 'Which team holds the record for the longest winning streak at 33 games?', options: ['Los Angeles Lakers', 'Golden State Warriors', 'Miami Heat', 'Houston Rockets'], correctIndex: 0, difficulty: 2 },
      { text: 'Who was named NBA Finals MVP in 2016?', options: ['LeBron James', 'Stephen Curry', 'Klay Thompson', 'Kyrie Irving'], correctIndex: 0, difficulty: 1 },
      { text: 'Which player has the most career three-pointers made?', options: ['Ray Allen', 'Stephen Curry', 'Reggie Miller', 'Klay Thompson'], correctIndex: 0, difficulty: 2},
      { text: 'In what year did the NBA and ABA officially merge?', options: ['1976', '1979', '1984', '1972'], correctIndex: 0, difficulty: 2 },
      { text: 'Which franchise has won the most NBA championships?', options: ['Boston Celtics', 'Los Angeles Lakers', 'Chicago Bulls', 'San Antonio Spurs'], correctIndex: 0, difficulty: 1 },
      { text: 'Who was named NBA Finals MVP in 1998?', options: ['Michael Jordan', 'Scottie Pippen', 'Dennis Rodman', 'Toni Kukoč'], correctIndex: 0, difficulty: 2 },
      { text: 'Who won the NBA Sixth Man of the Year award in 2020?', options: ['Montrezl Harrell', 'Lou Williams', 'Dennis Schröder', 'Caris LeVert'], correctIndex: 0, difficulty: 3 },
      { text: 'Which NBA player is nicknamed "The Glove"?', options: ['Gary Payton', 'Scottie Pippen', 'Dennis Rodman', 'Michael Jordan'], correctIndex: 0, difficulty: 1 },
      { text: 'What is the duration of the NBA shot clock (in seconds)?', options: ['24', '30', '14', '35'], correctIndex: 0, difficulty: 2 },
      { text: 'Who won the NBA Defensive Player of the Year award in 2019?', options: ['Rudy Gobert', 'Kawhi Leonard', 'Giannis Antetokounmpo', 'Anthony Davis'], correctIndex: 0, difficulty: 2 },
      { text: 'Which team selected Dirk Nowitzki 9th overall in the 1998 draft?', options: ['Dallas Mavericks', 'Milwaukee Bucks', 'Boston Celtics', 'Toronto Raptors'], correctIndex: 1, difficulty: 3 },
      { text: 'Who is the all-time leader in NBA steals?', options: ['John Stockton', 'Michael Jordan', 'Kobe Bryant', 'Gary Payton'], correctIndex: 0, difficulty: 1 },
      { text: 'Which player has won the most NBA Finals MVP awards?', options: ['Michael Jordan', 'LeBron James', 'Tim Duncan', 'Magic Johnson'], correctIndex: 0, difficulty: 1 },
      { text: 'Who holds the record for most points in a single NBA Finals game?', options: ['Rick Barry', 'Michael Jordan', 'Shaquille O\'Neal', 'Jerry West'], correctIndex: 1, difficulty: 2 },
      { text: 'Who won the NBA MVP award in 2005?', options: ['Steve Nash', 'Tim Duncan', 'Shaquille O\'Neal', 'Dirk Nowitzki'], correctIndex: 0, difficulty: 2 },
      { text: 'Who won the 1988 NBA Slam Dunk Contest with the free-throw line dunk?', options: ['Michael Jordan', 'Dominique Wilkins', 'Clyde Drexler', 'Jason Richardson'], correctIndex: 0, difficulty: 2 },
      { text: 'Who was the first non-American NBA MVP?', options: ['Dirk Nowitzki', 'Steve Nash', 'Giannis Antetokounmpo', 'Hakeem Olajuwon'], correctIndex: 1, difficulty: 2 },
      { text: 'Which team achieved a 73-win regular season in 2015-16?', options: ['Chicago Bulls', 'Golden State Warriors', 'Los Angeles Lakers', 'San Antonio Spurs'], correctIndex: 1, difficulty: 2 },
      { text: 'Which player won MVP, Finals MVP, All-Star MVP, and scoring title all in the same season?', options: ['Michael Jordan', 'LeBron James', 'Stephen Curry', 'Russell Westbrook'], correctIndex: 0, difficulty: 1 },
      { text: 'Who recorded a quadruple-double in an NBA game?', options: ['Nate Thurmond', 'Hakeem Olajuwon', 'David Robinson', 'Alvin Robertson'], correctIndex: 0, difficulty: 3},
      { text: 'Who was the youngest NBA scoring champion?', options: ['Kevin Durant', 'Derrick Rose', 'Kobe Bryant', 'LeBron James'], correctIndex: 0, difficulty: 1 },
      { text: 'Which coach has the highest regular-season winning percentage?', options: ['Gregg Popovich', 'Phil Jackson', 'Steve Kerr', 'Pat Riley'], correctIndex: 2, difficulty: 2 },
      { text: 'Who was the MVP of the first NBA All-Star Game?', options: ['Bob Pettit', 'Bill Russell', 'Oscar Robertson', 'Jerry West'], correctIndex: 0, difficulty: 3},
      { text: 'Who is the NBA career leader in blocked shots?', options: ['Hakeem Olajuwon', 'Dikembe Mutombo', 'Kareem Abdul-Jabbar', 'David Robinson'], correctIndex: 0, difficulty: 2 },
      { text: 'Who was the first NBA player drafted directly out of high school?', options: ['Kevin Garnett','Kobe Bryant','LeBron James','Tracy McGrady'], correctIndex: 0, difficulty: 2 },
      { text: 'Who was named NBA Finals MVP in 2017?', options: ['Kevin Durant','LeBron James','Stephen Curry','Kyrie Irving'], correctIndex: 0, difficulty: 1 },
      { text: 'Who is the shortest player to play in NBA history?', options: ['Muggsy Bogues','Spud Webb','Earl Boykins','Allen Iverson'], correctIndex: 0, difficulty: 2 },
      { text: 'Who is the tallest player in NBA history?', options: ['Gheorghe Muresan','Manute Bol','Shawn Bradley','Boban Marjanovic'], correctIndex: 0, difficulty: 2 },
      { text: 'Who holds the record for the most playoff points?', options: ['LeBron James','Michael Jordan','Kareem Abdul-Jabbar','Kobe Bryant'], correctIndex: 0, difficulty: 2 },
      { text: 'Which team relocated and became the Atlanta Hawks?', options: ['Tri-Cities Blackhawks','Buffalo Braves','Kansas City Kings','San Diego Rockets'], correctIndex: 0, difficulty: 2 },
      { text: 'Who scored 81 points in a game in 2006?', options: ['Kobe Bryant','Allen Iverson','LeBron James','Tracy McGrady'], correctIndex: 0, difficulty: 3 },
      { text: 'Who was the first unanimous MVP in NBA history?', options: ['Stephen Curry','LeBron James','Kevin Durant','Giannis Antetokounmpo'], correctIndex: 0, difficulty: 3 },
      { text: 'Who holds the record for most points in a single playoff game?', options: ['Michael Jordan','Elgin Baylor','Wilt Chamberlain','Allen Iverson'], correctIndex: 1, difficulty: 2 },
      { text: 'Who is the only player to win MVP and Defensive Player of the Year in the same season?', options: ['Michael Jordan','Hakeem Olajuwon','Giannis Antetokounmpo','Kevin Garnett'], correctIndex: 3, difficulty: 2 },
      { text: 'Who was the first player to dunk in an NBA All-Star Game?', options: ['Wilt Chamberlain','Julius Erving','Kareem Abdul-Jabbar','Magic Johnson'], correctIndex: 1, difficulty: 2 },
      { text: 'Which team won 17 consecutive games during the 2001-02 season?', options: ['Los Angeles Lakers','Philadelphia 76ers','Dallas Mavericks','San Antonio Spurs'], correctIndex: 0, difficulty: 2 },
      { text: 'Who hit the famous "Shot" over Craig Ehlo in 1989 playoffs?', options: ['Michael Jordan','Isiah Thomas','Larry Bird','Kevin McHale'], correctIndex: 0, difficulty: 3 },
      { text: 'Who holds the record for most blocks in a single game?', options: ['Elmore Smith','Hakeem Olajuwon','Kareem Abdul-Jabbar','Ben Wallace'], correctIndex: 0, difficulty: 2 },
      { text: 'Who has the most seasons scoring over 2000 points?', options: ['Michael Jordan','Kareem Abdul-Jabbar','Wilt Chamberlain','LeBron James'], correctIndex: 1, difficulty: 2 },
      { text: 'In which year did the NBA adopt the three-point line?', options: ['1979','1984','1976','1972'], correctIndex: 0, difficulty: 1 },
      { text: 'Who was the 2019 scoring champion?', options: ['James Harden','Giannis Antetokounmpo','Damian Lillard','Bradley Beal'], correctIndex: 0, difficulty: 1 },
      { text: 'Which franchise has never won an NBA championship?', options: ['Los Angeles Clippers','Phoenix Suns','Utah Jazz','Denver Nuggets'], correctIndex: 0, difficulty: 2 },
      { text: 'Who is known as "Mr. Clutch"?', options: ['Jerry West','Michael Jordan','Kobe Bryant','LeBron James'], correctIndex: 0, difficulty: 1 },
      { text: 'Which player is nicknamed "The Big Aristotle"?', options: ['Shaquille O\'Neal','Dikembe Mutombo','Yao Ming','David Robinson'], correctIndex: 0, difficulty: 1 },
      { text: 'Which team changed their name from the Bullets to the Wizards?', options: ['Washington Wizards','Oklahoma City Thunder','New Orleans Pelicans','Charlotte Hornets'], correctIndex: 0, difficulty: 2 },
      { text: 'Who holds the career record for triple-doubles?', options: ['Russell Westbrook','Oscar Robertson','LeBron James','Magic Johnson'], correctIndex: 0, difficulty: 2},
      { text: 'Which arena is nicknamed "The Mecca"?', options: ['Madison Square Garden','TD Garden','Crypto.com Arena','The Forum'], correctIndex: 0, difficulty: 2},
      { text: 'Who is the all-time leader in career turnovers?', options: ['Karl Malone','Kobe Bryant','LeBron James','Jason Kidd'], correctIndex: 0, difficulty: 2},
      { text: 'Which coach has the most regular-season wins?', options: ['Don Nelson','Lenny Wilkens','Gregg Popovich','Pat Riley'], correctIndex: 0, difficulty: 2},
      { text: 'Who was the first overall pick in the 1984 NBA Draft?', options: ['Hakeem Olajuwon','Michael Jordan','Charles Barkley','John Stockton'], correctIndex: 0, difficulty: 3 },
      { text: 'Who won the MVP award in 1994? ', options: ['Hakeem Olajuwon','Michael Jordan','David Robinson','Charles Barkley'], correctIndex: 2, difficulty: 2 },
      { text: 'Who was the first player to average a triple-double for a season?', options: ['Russell Westbrook','Oscar Robertson','LeBron James','Magic Johnson'], correctIndex: 1, difficulty: 2 },
      { text: 'Who was named NBA Finals MVP in 2010?', options: ['Kobe Bryant','Pau Gasol','Derek Fisher','Lamar Odom'], correctIndex: 0, difficulty: 2 },
      { text: 'Who was named NBA Finals MVP in 2015?', options: ['Andre Iguodala','Stephen Curry','LeBron James','Draymond Green'], correctIndex: 0, difficulty: 1 },
      { text: 'Who scored the first three-point field goal in NBA history?', options: ['Chris Ford','Michael Cooper','Larry Bird','Magic Johnson'], correctIndex: 0, difficulty: 2 },
      { text: 'How many personal fouls result in a player fouling out?', options: ['5','6','4','7'], correctIndex: 1, difficulty: 1 },
      { text: 'Who holds the record for most blocks in a single half?', options: ['Mark Eaton','Hakeem Olajuwon','Andrew Bynum','Manute Bol'], correctIndex: 0, difficulty: 2 },
      { text: 'Who was the 2021 MVP?', options: ['Nikola Jokić','Giannis Antetokounmpo','Joel Embiid','LeBron James'], correctIndex: 0, difficulty: 1 },
      { text: 'Who was the first player to reach 30,000 career points?', options: ['Kareem Abdul-Jabbar','Michael Jordan','Wilt Chamberlain','Karl Malone'], correctIndex: 0, difficulty: 2 },
      { text: 'Which team was originally the Buffalo Braves?', options: ['Los Angeles Clippers','Golden State Warriors','Sacramento Kings','Toronto Raptors'], correctIndex: 0, difficulty: 1 },
      { text: 'Who won Most Improved Player in 2019?', options: ['Pascal Siakam','Giannis Antetokounmpo','Rudy Gobert','Draymond Green'], correctIndex: 0, difficulty: 1 },
      { text: 'Who is the only player to win Finals MVP from the losing team?', options: ['Jerry West','LeBron James','Giannis Antetokounmpo','Kevin Durant'], correctIndex: 0, difficulty: 2 },
      { text: 'Who scored the most points in an NBA All-Star Game?', options: ['Kobe Bryant','Anthony Davis','Wilt Chamberlain','Jayson Tatum'], correctIndex: 1, difficulty: 1 },
      { text: 'What is the abbreviation for shooting guard?', options: ['SG','PG','SF','PF'], correctIndex: 0, difficulty: 1 },
      { text: 'Who holds the record for most consecutive games played (iron man streak)?', options: ['A.C. Green','Michael Jordan','John Stockton','LeBron James'], correctIndex: 0, difficulty: 1 },
      { text: 'Who is the all-time leader in career minutes played?', options: ['Kareem Abdul-Jabbar','Karl Malone','LeBron James','Kevin Garnett'], correctIndex: 0, difficulty: 2 },
      { text: 'Who is the only player to win an NBA championship as both player and head coach?', options: ['Bill Russell','Steve Kerr','Pat Riley','Phil Jackson'], correctIndex: 0, difficulty: 1 },
      { text: 'Which team did LeBron James start his career with?', options: ['Cleveland Cavaliers','Miami Heat','Los Angeles Lakers','Boston Celtics'], correctIndex: 0, difficulty: 1 },
      { text: 'Who won the NBA MVP award in 2018?', options: ['James Harden','LeBron James','Russell Westbrook','Giannis Antetokounmpo'], correctIndex: 0, difficulty: 2 },
      { text: 'Who was the youngest player to debut in the NBA?', options: ['Andrew Bynum','Kobe Bryant','LeBron James','Dwight Howard'], correctIndex: 0, difficulty: 2 },
      { text: 'Who was the oldest player to ever play in an NBA game?', options: ['Robert Parish','Vince Carter','Kareem Abdul-Jabbar','Kevin Willis'], correctIndex: 0 },
      { text: 'Which team plays at the Crypto.com Arena (formerly Staples Center)?', options: ['Los Angeles Lakers','Los Angeles Clippers','Los Angeles Kings','Los Angeles Sparks'], correctIndex: 0, difficulty: 1 },
      { text: 'Who was the NBA Finals MVP in 1983?', options: ['Moses Malone','Larry Bird','Magic Johnson','Kareem Abdul-Jabbar'], correctIndex: 0, difficulty: 3 },
      { text: 'Who is the all-time leader in free throws made?', options: ['Karl Malone','Dirk Nowitzki','Michael Jordan','Kobe Bryant'], correctIndex: 0, difficulty: 1 },
      { text: 'Who is the all-time leader in playoff rebounds?', options: ['Bill Russell','Wilt Chamberlain','Tim Duncan','Shaquille O\'Neal'], correctIndex: 0, difficulty: 1 },
      { text: 'Who was the first unanimous MVP?', options: ['Stephen Curry','Shaquille O\'Neal','LeBron James','Michael Jordan'], correctIndex: 0, difficulty: 3 },
      { text: 'Who coached the Chicago Bulls during the 1990s championships?', options: ['Phil Jackson','Doug Collins','Jerry Sloan','Pat Riley'], correctIndex: 0, difficulty: 3 },
      { text: 'Which team did Oscar Robertson play for when he averaged a triple-double?', options: ['Cincinnati Royals', 'Milwaukee Bucks', 'Indianapolis Jets', 'Rochester Royals'], correctIndex: 0 },
      { text: 'Who was the NBA Finals MVP in 1958?', options: ['Bob Pettit', 'Bill Russell', 'George Mikan', 'Jerry West'], correctIndex: 0, difficulty: 3},
      { text: 'Who is the NBA\'s all-time leader in games played?', options: ['Robert Parish', 'Vince Carter', 'Dirk Nowitzki', 'Kareem Abdul-Jabbar'], correctIndex: 0, difficulty: 2 },
      { text: 'What is the maximum active roster size for an NBA team?', options: ['15', '12', '17', '13'], correctIndex: 1, difficulty: 2 },
      { text: 'Who scored the first basket in NBA history?', options: ['Ossie Schectman', 'Joe Fulks', 'Nat Clifton', 'Bob Cousy'], correctIndex: 0, difficulty: 3 },
      { text: 'Who holds the record for most steals in a single NBA game?', options: ['Larry Kenon', 'Micheal Ray Richardson', 'Kendall Gill', 'Rick Barry'], correctIndex: 0, difficulty: 1 },
      { text: 'Which UCLA legend played from 1967 to 1969?', options: ['Lew Alcindor', 'Bill Walton', 'Sidney Wicks', 'Jamaal Wilkes'], correctIndex: 0, difficulty: 3 },
      { text: 'Who was the NBA MVP in 1963?', options: ['Bill Russell', 'Wilt Chamberlain', 'Oscar Robertson', 'Jerry Lucas'], correctIndex: 1, difficulty: 3 },
      { text: 'Who won the Sixth Man of the Year award in 2021?', options: ['Jordan Clarkson', 'Montrezl Harrell', 'Tyler Herro', 'Dennis Schröder'], correctIndex: 0, difficulty: 1}
    ];

    for (const q of questions) {
      await Question.create(q);
    }

    console.log('Seeding complete!');
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  } finally {
    // Close the connection when done
    await mongoose.disconnect();
  }
}

seed();