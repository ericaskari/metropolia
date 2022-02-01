using System;
namespace Lab8
{
    public class Main
    {
        public Main()
        {
        }

        public void Start()
        {

            DoTheDice();

        }

        private void DoTheDice()
        {
            Dice dice = new();
            Player player = new(dice);

            int[] allPossibleDiceValues = { 1, 2, 3, 4, 5, 6 };

            List<int> diceValues = new List<int>();
            int counter = 0;
            do
            {
                var diceValue = player.Play();
                Console.WriteLine($"Rolling: {diceValue}");
                if (!diceValues.Contains(diceValue))
                {
                    Console.WriteLine($"Unique Value");
                    diceValues.Add(diceValue);
                }
                counter++;
            } while (diceValues.Count != allPossibleDiceValues.Length);

            Console.WriteLine($"It took {counter} times");
            Console.WriteLine($"Results:");

            foreach (var diceValue in diceValues)
            {
                Console.WriteLine($"{diceValue}");
            }
        }
    }
}
