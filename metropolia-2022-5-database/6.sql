USE RPG;

# Käytä kaikissa tehtävissä sisäkysely-tekniikkaa.

INSERT INTO Enemy VALUES  (5, 'Azog', 300, 1, 1);


# 1 Mikä on ”Azogin” vihollistyypin kuvaus?
SELECT EnemyType.description
FROM Enemy
         INNER JOIN EnemyType on EnemyType.id = Enemy.enemyTypeId
WHERE name = 'Azog';


# 2 Mikä on pisteen 0,0 liikkumisvaikeus?

SELECT TileType.movementDiff
FROM Tile
         INNER JOIN TileType on TileType.id = Tile.tileTypeId
WHERE coordinateX = 0
  AND coordinateY = 0;


# 3 Millä tilellä (id) ”Foxy” sijaitsee?

# En ymmärrä mikä "Foxy" on


# 4 Mitkä ovat kirjan (book) koordinaatisto pisteet?

SELECT Tile.coordinateX, Tile.coordinateY
FROM WorldObject
         INNER JOIN Tile on Tile.id = WorldObject.tileId
WHERE name = 'book';


# 5 Tulosta pelin kaikkien örkkien nimet

SELECT Enemy.name
FROM Enemy
         INNER JOIN EnemyType on EnemyType.id = Enemy.enemyTypeId
WHERE EnemyType.description = 'orc';


#  6 Tulosta kaikkien vuoristoa olevien tilejen x,y koordinaatisto pisteet


SELECT Tile.coordinateX, Tile.coordinateY
FROM Tile
         INNER JOIN TileType on TileType.id = Tile.tileTypeId
WHERE TileType.description = 'Mountain';


#  7 Selvitä minkä tyyppisessä maastossa pelihahmo sijaitsee

SELECT TileType.description
FROM Player
         INNER JOIN Tile on Tile.id = Player.tileId
         INNER JOIN TileType on TileType.id = Tile.tileTypeId;


# 8 Selvitä minkä tyyppisessä maastossa ”Grr” sijaitsee.

#   En ymmärrä mikä "Grr" on

