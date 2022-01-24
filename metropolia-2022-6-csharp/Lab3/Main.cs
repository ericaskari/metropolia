using System;
namespace Lab3
{
    public class Main
    {
        public Main()
        {
        }

        public void Start()
        {
            Roulette roulette = new();

            Player player = new(roulette);

            player.Play();
        }
    }
}
