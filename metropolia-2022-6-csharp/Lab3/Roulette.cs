namespace Lab3;

public class Roulette
{
    private Random _random = new Random();

    List<int> numbers = new List<int>();

    public Roulette()
    {
        // double zero
        numbers.Add(0);

        for (int i = 0; i <= 36; i++)
        {
            numbers.Add(i);
        }
    }

    public int Spin()
    {
        return _random.Next(0, numbers.Count - 1);
    }
}