USE RPG;

# 1 ID and enemy type description for enemies that are in bad shape (hp of 50 or less)
SELECT Enemy.id, EnemyType.description
FROM Enemy
    INNER JOIN EnemyType on EnemyType.id = Enemy.enemyTypeId
WHERE hp < 50;


# 2 Coordinates and movement difficulty for each tile
SELECT Tile.coordinateX, Tile.coordinateY, TileType.movementDiff
FROM Tile
         INNER JOIN TileType on TileType.id = Tile.tileTypeId;


# 3 What are the x and y coordinates of the tile player is located in?
SELECT Tile.coordinateX, Tile.coordinateY
FROM Player
         INNER JOIN Tile on Tile.id = Player.tileId;



# 4 What is the type of the tile the player is located in?
SELECT TileType.description
FROM Player
         INNER JOIN Tile on Tile.id = Player.tileId
         INNER JOIN TileType on TileType.id = Tile.tileTypeId;



# 5 How difficult it is to move on player’s current tile?
SELECT TileType.movementDiff
FROM Player
         INNER JOIN Tile on Tile.id = Player.tileId
         INNER JOIN TileType on TileType.id = Tile.tileTypeId;





# 6 Name of enemy and its enemy type description.
SELECT Enemy.name, EnemyType.description
FROM Enemy
         INNER JOIN EnemyType on EnemyType.id = Enemy.enemyTypeId;


# Noudata left/righ- join tekniikkaa, tarpeen mukaisesti



#  7 Tee kysely, joka näyttää kaikkien esineiden nimen sekä omistaja nimen. Huom. halutaan, että
# esineen nimi, näkyy vaikka esine ei olisikaan pelaajan hallussa vaan makaisi maassa. Tällöin
# haun tuloksessa näkyy ”NULL” pelihahmon nimen tilalla.


SELECT *
FROM WorldObject
         INNER JOIN Player on Player.id = WorldObject.ownerId;


# 8 Tee kysely, joka näyttää kaikki tilejen x,y koordinaatit ja niissä mahdollisesti sijaitsevien esineiden
# nimet. Huom. jos esinettä ei ole tilellä, niin siitä huolimatta kaikkien x,y koordinaattien tulee näkyä

SELECT Tile.coordinateX, Tile.coordinateY, TileType.description
FROM Tile
         INNER JOIN TileType on TileType.id = Tile.tileTypeId;


