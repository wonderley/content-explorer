CREATE DATABASE ContentExplorer;

CREATE TABLE Items (
    item_id int PRIMARY KEY,
    title varchar NOT NULL,
    url varchar NOT NULL,
    positionX int NOT NULL,
    positionY int NOT NULL
);

INSERT INTO Items
  ( item_id, title, url, positionX, positionY )
VALUES
  (0, 'Art of Smash Ultimate: Beginner - Part 1', 'https://www.youtube.com/watch?v=ta3L35wsE6o', 100, 100), 
  (1, 'Art of Smash Ultimate: Advanced - Part 2', 'https://www.youtube.com/watch?v=UopyuXelF7k', 300, 100), 
  (2, 'Art of Smash Ultimate: Expert - Part 3', 'https://www.youtube.com/watch?v=Fdf0P3UVh90', 500, 100), 
  (3, 'Art of Smash Ultimate: Master - Part 4', 'https://www.youtube.com/watch?v=TVtAwIpeQ7k', 100, 500), 
  (4, 'Art of Smash Ultimate: Godlike - Mentality', 'https://www.youtube.com/watch?v=g17gk1_fA5o', 300, 500)
