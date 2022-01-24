namespace Lab3;

public class Roulette
{
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
        return new Random().Next(0, numbers.Count - 1);
    }
}