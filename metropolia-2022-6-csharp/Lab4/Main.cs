using System;
namespace Lab4
{
    public class Main
    {
        public Main()
        {
        }

        public void Start()
        {
            DoTheLoops();
        }


        private void DoTheLoops()
        {
            LoopTester loopTester = new();

            loopTester.DoTheLoops();


            Console.WriteLine("Extra Problem: ");

            Dice dice1 = new();
            Dice dice2 = new();

            int throwCount = 0;

            do
            {
                throwCount += 1;

            } while (dice1.Throw() != 6 && dice2.Throw() != 6);

            Console.WriteLine($"It took {throwCount} throws to get a double six");
        }

    }
}
