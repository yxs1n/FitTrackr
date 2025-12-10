# Create database script for Fittrackr

-- Create the database
CREATE DATABASE IF NOT EXISTS fittrackr;
USE fittrackr;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(50),
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    hashedPassword VARCHAR(255) NOT NULL,
    PRIMARY KEY(username)
);

-- Create application user

CREATE USER IF NOT EXISTS 'fittrackr_app'@'localhost' IDENTIFIED BY 'qwertyuiop';
GRANT ALL PRIVILEGES ON fittrackr.* TO 'fittrackr_app'@'localhost';