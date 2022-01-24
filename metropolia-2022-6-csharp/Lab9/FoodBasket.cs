using System;
namespace Lab9
{
    public class FoodBasket
    {
        double price = 0;

        public FoodBasket(double initialPrice)
        {
            price = initialPrice;
        }


        public void IncreaseMonthly()
        {
            price += (price / 100) * 1.5;

        }

        public double GetPrice()
        {
            return Math.Round(price, 2);
        }

        public static string GetMonthName(int month)
        {
            return new DateTime(2000, month, 1).ToString("MMMM");
        }
    }
}
