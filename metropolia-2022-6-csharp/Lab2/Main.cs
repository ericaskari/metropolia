using System;
namespace Lab2
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


            var diceValue = player.Play();

            var count = 0;

            do
            {

                diceValue = player.Play();

                count += 1;

                Console.WriteLine($"{count}th throw: This time i got: {diceValue}");

            }
            while (diceValue != 6);

            Console.WriteLine($"Took me {count} times to get a 6");

        }


    }
}
