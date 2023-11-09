CREATE DATABASE IF NOT EXISTS bemexdb;
CREATE USER IF NOT EXISTS 'bemexuser'@'localhost' IDENTIFIED BY 'bemexpwd';
GRANT ALL PRIVILEGES ON bemexdb.* TO 'bemexuser'@'localhost';
GRANT SELECT ON performance_schema.* TO 'bemexuser'@'localhost';

CREATE TABLE bemexdb.Domine
             (IDDomine INT AUTO_INCREMENT PRIMARY KEY,
              TitleDomine VARCHAR(255) NOT NULL);

CREATE TABLE bemexdb.Readings
             (ReadingID INT AUTO_INCREMENT PRIMARY KEY,
              Title VARCHAR(255) NOT NULL,
              Picture VARCHAR(255) NOT NULL,
              ReadingText TEXT NOT NULL,
              LinkToYouTubeMedia VARCHAR(255),
              EstimatedTimeToRead INT,
              IDDomine INT,
              FOREIGN KEY (IDDomine) REFERENCES bemexdb.Domine(IDDomine));

CREATE TABLE bemexdb.Questions
             (QuestionID INT AUTO_INCREMENT PRIMARY KEY,
              QuestText TEXT NOT NULL,
              IDDomine INT,
              FOREIGN KEY (IDDomine) REFERENCES bemexdb.Domine(IDDomine),
              ReadingID INT,
              FOREIGN KEY (ReadingID) REFERENCES bemexdb.Readings(ReadingID));

CREATE TABLE bemexdb.User
             (UserID INT AUTO_INCREMENT PRIMARY KEY,
              Name VARCHAR(255) NOT NULL,
              Email VARCHAR(255) NOT NULL,
              Password VARCHAR(255) NOT NULL,
              CurrentPremium BOOLEAN NOT NULL,
              InitPremium DATE,
              EndPremium DATE);

CREATE TABLE bemexdb.QuestionsPracticed
             (UserID INT,
              QuestionID INT,
              IsCorrect BOOLEAN NOT NULL,
              FOREIGN KEY (UserID) REFERENCES bemexdb.User(UserID),
              FOREIGN KEY (QuestionID) REFERENCES bemexdb.Questions(QuestionID));

CREATE TABLE bemexdb.Requirements
             (IDRequirement INT AUTO_INCREMENT PRIMARY KEY,
              CategoryRequirement VARCHAR(255) NOT NULL,
              Description TEXT NOT NULL,
              Copies INT,
              IsCompleted BOOLEAN NOT NULL,
              UserID INT,
              FOREIGN KEY (UserID) REFERENCES bemexdb.User(UserID));

CREATE TABLE bemexdb.IncorrectAnswer
             (IDWrongAnswer INT AUTO_INCREMENT PRIMARY KEY,
              TextWrongAnswer TEXT NOT NULL,
              QuestionID INT,
              FOREIGN KEY (QuestionID) REFERENCES bemexdb.Questions(QuestionID));

CREATE TABLE bemexdb.RightAnswer
             (IDRightAnswer INT AUTO_INCREMENT PRIMARY KEY,
              TextRightAnswer TEXT NOT NULL,
              QuestionID INT,
              FOREIGN KEY (QuestionID) REFERENCES bemexdb.Questions(QuestionID));


FLUSH PRIVILEGES;
