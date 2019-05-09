CREATE DATABASE SmashContent;

CREATE TABLE Items (
  ItemID int PRIMARY KEY,
  URL varchar NOT NULL,
  Title varchar
);

CREATE TABLE Tags (
  TagID int PRIMARY KEY,
  Name varchar NOT NULL
);

CREATE TABLE ItemTags (
  ItemID int,
  TagID int,
  FOREIGN KEY (ItemID) REFERENCES Items(ItemID), 
  FOREIGN KEY (TagID) REFERENCES Tags(TagID),
  UNIQUE (ItemID, TagID)
);

INSERT INTO Items
  ( ItemID, URL, Title )
VALUES
  (0, 'https://www.youtube.com/watch?v=ta3L35wsE6o', 'Art of Smash Ultimate: Beginner - Part 1'), 
  (1, 'https://www.youtube.com/watch?v=UopyuXelF7k', NULL),
  (2, 'https://www.youtube.com/watch?v=Fdf0P3UVh90', NULL),
  (3, 'https://www.youtube.com/watch?v=TVtAwIpeQ7k', 'Art of Smash Ultimate: Master - Part 4'), 
  (4, 'https://www.youtube.com/watch?v=g17gk1_fA5o', 'Art of Smash Ultimate: Godlike - Mentality'),
  (5, 'https://www.youtube.com/watch?v=-zfFgEabjYI', 'Most Wild Offstage Shenanigans in Smash Ultimate #2'),
  (6, 'https://www.youtube.com/watch?v=QBonHknf4Eg', 'Grimy Gimps and Extreme Edge Guards in Smash Ultimate #7'),
  (7, 'https://www.youtube.com/watch?v=PwAE3ceCMfI', 'Super Smash Bros. Ultimate - Who Can Get Out of a Black Hole?');

INSERT INTO Tags
  (TagID, Name)
VALUES
  (0, 'Techniques'),
  (1, 'Edge Guarding'),
  (2, 'Items');

INSERT INTO ItemTags
  (ItemID, TagID)
VALUES
  (0, 0), (1, 0), (2, 0), (3, 0), (4, 0), (5, 1), (6, 1), (7, 2);
