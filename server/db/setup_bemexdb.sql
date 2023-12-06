-- Create the database if it doesn't already exist
CREATE DATABASE IF NOT EXISTS bemexdb;

-- Select the database for subsequent operations
USE bemexdb;

-- Create a specific user for the database
CREATE USER IF NOT EXISTS 'devuser'@'localhost' IDENTIFIED BY 'bemexpwd';

-- Assign privileges to the user
GRANT ALL PRIVILEGES ON bemexdb.* TO 'devuser'@'localhost';
GRANT SELECT ON performance_schema.* TO 'devuser'@'localhost';

-- Create the Users table
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Ensure to store hashed passwords
    email VARCHAR(255) NOT NULL UNIQUE,
    is_premium BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the Premium Subscriptions table
CREATE TABLE IF NOT EXISTS PremiumSubscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    subscription_start DATE,
    subscription_end DATE,
    FOREIGN KEY (user_id) REFERENCES Users(id) -- Relation to the Users table
);

-- Create the Requirement Groups table
CREATE TABLE IF NOT EXISTS RequirementGroups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT -- Description of the requirement group
);

-- Create the Requirements table
CREATE TABLE IF NOT EXISTS Requirements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    copies_needed INT NOT NULL, -- Number of copies needed for the requirement
    FOREIGN KEY (group_id) REFERENCES RequirementGroups(id) -- Relation to requirement groups
);

-- Create the User Requirements table
CREATE TABLE IF NOT EXISTS UserRequirements (
    user_id INT NOT NULL,
    requirement_id INT NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (user_id, requirement_id),
    FOREIGN KEY (user_id) REFERENCES Users(id), -- Relation to the Users table
    FOREIGN KEY (requirement_id) REFERENCES Requirements(id) -- Relation to the Requirements table
);

-- Create the Study Categories table
CREATE TABLE IF NOT EXISTS StudyCategories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL -- Name of the study category
);

-- Create the Questions table
CREATE TABLE IF NOT EXISTS Questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    question_text TEXT NOT NULL, -- Text of the question
    FOREIGN KEY (category_id) REFERENCES StudyCategories(id) -- Relation to study categories
);

-- Create the AnswerTypes table
CREATE TABLE IF NOT EXISTS AnswerTypes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL -- Description of the answer type (e.g., 'Historical', 'Geographical', etc.)
);

-- Create the Answers table with type_id and explanation included
CREATE TABLE IF NOT EXISTS Answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT,
    type_id INT, -- Type of the answer
    answer_text TEXT NOT NULL, -- Text of the answer
    learning_tips TEXT, -- Learning tips or additional information
    is_correct BOOLEAN NOT NULL, -- Indicates if the answer is correct
    FOREIGN KEY (question_id) REFERENCES Questions(id), -- Relation to questions
    FOREIGN KEY (type_id) REFERENCES AnswerTypes(id) -- Relation to answer types
);

-- Create the User Exam Attempts table
CREATE TABLE IF NOT EXISTS UserExamAttempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    question_id INT,
    selected_answer_id INT,
    is_correct BOOLEAN,
    attempt_date DATETIME, -- Date and time of the exam attempt
    score INT, -- Score obtained in the exam attempt
    FOREIGN KEY (user_id) REFERENCES Users(id), -- Relation to the Users table
    FOREIGN KEY (question_id) REFERENCES Questions(id), -- Relation to questions
    FOREIGN KEY (selected_answer_id) REFERENCES Answers(id) -- Relation to selected answers
);
