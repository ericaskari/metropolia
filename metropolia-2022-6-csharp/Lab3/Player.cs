namespace Lab3;

public class Player
{
    private Roulette _roulette;


    public Player(Roulette roulette)
    {
        _roulette = roulette;
    }

    public void Play()
    {
        int number = _roulette.Spin();
        Console.WriteLine($"Player got {number}");
    }
}