USE RPG;


SELECT Enemy.id, EnemyType.description
FROM Enemy
         INNER JOIN EnemyType
WHERE EnemyType.id = Enemy.enemyTypeId
  AND hp < 50;



SELECT Tile.coordinateX, Tile.coordinateY, TileType.movementDiff
FROM Tile
         INNER JOIN TileType
WHERE TileType.id = Tile.tileTypeId;

# 3 Description of objects held by player.
SELECT WorldObject.description
FROM WorldObject
WHERE WorldObject.ownerId IS NOT NULL;

# 4 What are the x and y coordinates of the tile player is located in?
SELECT Tile.coordinateX, Tile.coordinateY
FROM Player
         INNER JOIN Tile
WHERE Player.tileId = Tile.id;

# 5 What is the type of the tile the player is located in?

SELECT TileType.description
FROM Player
         INNER JOIN Tile
         INNER JOIN TileType
WHERE Player.tileId = Tile.id AND Tile.tileTypeId = TileType.id;


# 6 How difficult it is to move on player’s current tile?
SELECT TileType.movementDiff
FROM Player
         INNER JOIN Tile
         INNER JOIN TileType
WHERE Player.tileId = Tile.id AND Tile.tileTypeId = TileType.id;

# 7 Which objects are owned by the player?
SELECT *
FROM WorldObject
WHERE WorldObject.ownerId IS NOT NULL;


#  8 What are the x and y coordinates of game objects?
SELECT Tile.coordinateX, Tile.coordinateY
FROM WorldObject
         INNER JOIN Tile
WHERE WorldObject.tileId = Tile.id;

#  9 What enemies are located in the same tile as player?

SELECT *
FROM Player
         INNER JOIN Enemy
         INNER JOIN Tile
WHERE Player.tileId = Tile.id AND Enemy.tileId = Tile.id;









