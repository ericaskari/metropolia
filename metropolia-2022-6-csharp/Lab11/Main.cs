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
            string userInput = "";

            FinnishTranslator finnishTranslator = new();

            do
            {
                userInput = Console.ReadLine() ?? "";

                var translated = finnishTranslator.Translate(userInput);

                Console.WriteLine($"Word: {userInput} Translated: {translated}");

            } while (true);
        }
    }
}
