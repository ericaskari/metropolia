USE RPG;

SELECT *
FROM Enemy;

SELECT coordinateX, coordinateY
FROM Tile;

SELECT description
FROM TileType
ORDER BY description ASC;

SELECT description, attackValue, defValue
FROM EnemyType
ORDER BY
    defValue    ASC,
    attackValue ASC;

SELECT description
FROM EnemyType
WHERE description;


SELECT description
FROM EnemyType
WHERE description LIKE 'A%';


SELECT description
FROM WorldObject
WHERE description LIKE '%A%';



SELECT id, hp
FROM Enemy
WHERE hp > 50;


SELECT id, hp
FROM Enemy
WHERE hp > 50 AND hp < 90;



