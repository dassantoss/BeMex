-- prepares a MySQL server for the BeMex project

CREATE DATABASE IF NOT EXISTS bemexdb;
CREATE USER IF NOT EXISTS 'bemexuser'@'localhost' IDENTIFIED BY 'bemexpwd';
GRANT ALL PRIVILEGES ON `bemexdb`.* TO 'bemexuser'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'bemexuser'@'localhost';
CREATE TABLE Readings
       	     (ReadingID INT AUTO_INCREMENT PRIMARY KEY,
       	      Title VARCHAR(255) NOT NULL,
	      Picture VARCHAR(255) NOT NULL,
	      ReadingText TEXT NOT NULL,
	      LinkToYouTubeMedia VARCHAR(255),
	      EstimatedTimeToRead INT,
	      IDDomine INT,
	      FOREIGN KEY (IDDomine)REFERENCES Domine(IDDomine));
CREATE TABLE Questions
             (QuestionID INT AUTO_INCREMENT PRIMARY KEY,
	      QuestText TEXT NOT NULL,
	      IDDomine INT,
	      FOREIGN KEY (IDDomine) REFERENCES Domine(IDDomine),
	      ReadingID INT,
	      FOREIGN KEY (ReadingID) REFERENCES Readings(ReadingID));
CREATE TABLE QuestionsPracticed
       	     (UserID INT,
	      QuestionID INT,
	      IsCorrect BOOLEAN NOT NULL,
	      FOREIGN KEY (UserID) REFERENCES User(UserID),
	      FOREIGN KEY (QuestionID) REFERENCES Questions(QuestionID));
CREATE TABLE User
       	     (UserID INT AUTO_INCREMENT PRIMARY KEY,
	      Name VARCHAR(255)NOT NULL,
	      Email VARCHAR(255) NOT NULL,
	      Password VARCHAR(255) NOT NULL
	      CurrentPremium BOOLEAN NOT NULL,
	      InitPremium DATE,
	      EndPremium DATE);
CREATE TABLE Requirements
       	     (IDRequirement INT AUTO_INCREMENT PRIMARY KEY,
	      TitleRequirement VARCHAR(255) NOT NULL,
	      TextRequirement TEXT NOT NULL,
	      SourceOfInformation VARCHAR(255),
	      IsCompleted BOOLEAN NOT NULL,
	      UserID INT,
	      FOREIGN KEY (UserID)REFERENCES User(UserID));
CREATE TABLE IncorrectAnswer
       	     (IDWrongAnswer INT AUTO_INCREMENT PRIMARY KEY,
	      TextWrongAnswer TEXT NOT NULL,
	      QuestionID INT,
	      FOREIGN KEY (QuestionID)REFERENCES Questions(QuestionID));
CREATE TABLE RightAnswer
       	     (IDRightAnswer INT AUTO_INCREMENT PRIMARY KEY,
	      TextRightAnswer TEXT NOT NULL,
	      QuestionID INT,
	      FOREIGN KEY (QuestionID) REFERENCES Questions(QuestionID));
CREATE TABLE Domine
       	     (IDDomine INT AUTO_INCREMENT PRIMARY KEY,
	      TitleDomine VARCHAR(255) NOT NULL);
FLUSH PRIVILEGES;
