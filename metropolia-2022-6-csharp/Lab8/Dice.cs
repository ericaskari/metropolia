using System;
namespace Lab8
{
    public class Dice
    {
        public Dice()
        {
 
        }

        public int Throw()
        {

            var randomNumber = new Random().Next(1, 7);

            return randomNumber;

        }
    }
}
