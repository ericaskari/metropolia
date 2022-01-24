using System;

namespace Lab10
{
    public class Main
    {
        public Main()
        {
        }


        public void Start()
        {

            string? userInput;
            int triangleSize;

            do
            {
                userInput = Console.ReadLine();

            } while (!Int32.TryParse(userInput, out triangleSize));

            Triangle triangle = new(triangleSize);

        }
    }
}
