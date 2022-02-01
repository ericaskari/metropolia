using System;

namespace Lab10
{
    class Program
    {
        static void Main(string[] args)
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
