DROP DATABASE RPG;
CREATE DATABASE RPG;
USE RPG;

CREATE TABLE TileType
(
    id              INT UNSIGNED,
    movementDiff    INT UNSIGNED,
    combatDiff      INT UNSIGNED,
    description     VARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE Tile
(
    id             INT UNSIGNED,
    tileTypeId     INT UNSIGNED,
    coordinateX    INT UNSIGNED,
    coordinateY    INT UNSIGNED,
    PRIMARY KEY (id),
    FOREIGN KEY (tileTypeId) REFERENCES TileType (id)
);

CREATE TABLE Player
(
    id              INT UNSIGNED,
    name            VARCHAR(100),
    level           INT UNSIGNED,
    hp              INT UNSIGNED,
    wealth          INT UNSIGNED,
    tileId          INT UNSIGNED,
    PRIMARY KEY (id),
    FOREIGN KEY (tileId) REFERENCES Tile(id)
);

CREATE TABLE EnemyType
(
    id              INT UNSIGNED,
    attackValue     INT UNSIGNED,
    defValue        INT UNSIGNED,
    initialHp       INT UNSIGNED,
    description     VARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE Enemy
(
    id              INT UNSIGNED,
    name            VARCHAR(100),
    hp              INT UNSIGNED,
    tileId          INT UNSIGNED,
    enemyTypeId     INT UNSIGNED,
    PRIMARY KEY (id),
    FOREIGN KEY (tileId) REFERENCES Tile(id),
    FOREIGN KEY (enemyTypeId) REFERENCES EnemyType(id)
);

CREATE TABLE WorldObject
(
    id              INT UNSIGNED,
    name            VARCHAR(100),
    ownerId         INT UNSIGNED,
    tileId          INT UNSIGNED,
    attackValue     INT UNSIGNED,
    defValue        INT UNSIGNED,
    worth           INT UNSIGNED,
    description     VARCHAR(100),
    PRIMARY KEY (id),
    FOREIGN KEY (ownerId) REFERENCES Player(id),
    FOREIGN KEY (tileId) REFERENCES Tile(id)
);

INSERT INTO TileType VALUES (1, 5, 8, 'Forest'),
                            (2, 13, 11, 'Mountain'),
                            (3, 2, 3, 'Road'),
                            (4, 16, 14, 'Swamp');

INSERT INTO Tile VALUES (1, 2, 0, 0),
                        (2, 2, 1, 0),
                        (3, 1, 2, 0),
                        (4, 1, 3, 0),
                        (5, 2, 0, 1),
                        (6, 1, 1, 1),
                        (7, 1, 2, 1),
                        (8, 4, 3, 1),
                        (9, 2, 0, 2),
                        (10, 3, 1, 2),
                        (11, 3, 2, 2),
                        (12, 1, 3, 2);

INSERT INTO Player VALUES (1, 'avatar', 10, 1000, 100000, 1);

INSERT INTO EnemyType VALUES    (1, 5, 4, 100, 'orc'),
                                (2, 55, 40, 1000, 'dragon'),
                                (3, 3, 2, 50, 'goblin');

INSERT INTO WorldObject VALUES (1, 'sword', 1, NULL, 100, 50, 25, 'A world object with sword name'),
                              (2, 'shield', NULL, 2, 10, 100, 12, 'A world object with shield name'),
                              (3, 'book', NULL, 3, 1, 1, 1000, 'A world object with book name');

INSERT INTO Enemy VALUES  (1, 'Xodor', 400, 8, 2);
INSERT INTO Enemy VALUES  (2, 'Ant', 40, 8, 2);
INSERT INTO Enemy VALUES  (3, 'Ant', 10, 8, 2);
INSERT INTO Enemy VALUES  (4, 'Fireman', 10, 1, 2);

INSERT INTO WorldObject VALUES (4, 'Magic Scroll', 1, 3, 1, 150, 50, 'A world object with Magic Scroll name');


