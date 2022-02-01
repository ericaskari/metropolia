using System;
namespace Lab9
{
    public class Main
    {
        public Main()
        {
        }

        public void Start()
        {
            FoodBasket foodBasket = new(100);
            for(int i = 1; i <= 12; i++)
            {
                Console.WriteLine($"FoodBasket price for {FoodBasket.GetMonthName(i)} month is:{foodBasket.GetPrice()}");
                foodBasket.IncreaseMonthly();
            }
        }
    }
}
