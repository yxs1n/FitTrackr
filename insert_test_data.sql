USE health;

INSERT INTO users (username, firstName, lastName, email, hashedPassword) VALUES
('gold', 'Goldsmiths', 'College', 'golds@gold.ac.uk', '$2b$10$ikdhA5Ha8ex.uQPJOJTvfenttKHKmoC9SO2xehOhTz32cf/H/cDHG');

INSERT INTO workouts (user_id, date, type, duration, calories, notes)
VALUES
(1, '2025-12-10', 'Running', 30, 250, 'Morning jog in the park'),
(1, '2025-12-09', 'Cycling', 45, 400, 'Evening ride with friends');