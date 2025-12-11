# FitTrackr

## Overview
FitTrackr is a web application designed to help users log and track their fitness activities. The app allows users to register and log in securely, add detailed workout entries, view their workout history, and search through logged workouts. Its goal is to provide an easy-to-use interface for managing personal fitness data, while demonstrating core web development techniques including Node.js, Express, EJS templating, MySQL database integration, and session management.

## Key Features
- **User Authentication**: Secure registration and login with hashed passwords.  
- **Workout Logging**: Users can record workouts including date, type, duration, calories burned, and optional notes.  
- **Workout Dashboard**: View all workouts in reverse chronological order, including most recent workouts.  
- **Search Workouts**: Filter workouts by type or keyword in notes.  
- **Flash Messages**: Feedback messages are displayed for actions like logging in, logging out, or adding a workout.  
- **Session Management**: Users must be logged in to access their workouts; session state persists across pages.

## Technologies Used
- **Backend**: Node.js, Express.js  
- **Templating Engine**: EJS  
- **Database**: MySQL (using mysql2 package)  
- **Authentication & Security**: bcrypt for password hashing, express-session for session handling  
- **Validation**: express-validator for validating form input  
- **Styling**: CSS for layout and responsive design
