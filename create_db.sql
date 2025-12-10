# Create database script for Fittrackr

-- Create the database
CREATE DATABASE IF NOT EXISTS fittrackr;
USE fittrackr;

-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    email VARCHAR(100),
    hashedPassword VARCHAR(255)
);

-- Create workouts table
CREATE TABLE workouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    type VARCHAR(50) NOT NULL,
    duration INT,
    calories INT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create application user

CREATE USER IF NOT EXISTS 'fittrackr_app'@'localhost' IDENTIFIED BY 'qwertyuiop';
GRANT ALL PRIVILEGES ON fittrackr.* TO 'fittrackr_app'@'localhost';