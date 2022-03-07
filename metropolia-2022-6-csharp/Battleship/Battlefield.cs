namespace Battleship;

public class Battlefield
{
    List<Land> lands = new List<Land>();

    Ship battleshipSmall = new Ship(1, 2, "USNS Invincible");
    Ship battleshipMedium = new Ship(1, 4, "USNS Howard O.Lorenzen");
    Ship battleshipLarge = new Ship(2, 6, "USNS John Glenn");
    Ship battleshipExtraLarge = new Ship(2, 8, "USNS Arctic");

    public Battlefield()
    {
        for (int landX = 1; landX <= 10; landX++)
        {
            for (int landY = 1; landY <= 10; landY++)
            {
                string name = $"Land {landX}-{landY}";
                Land land = new Land(name, landX, landY);
                this.lands.Add(land);
            }
        }
    }
}