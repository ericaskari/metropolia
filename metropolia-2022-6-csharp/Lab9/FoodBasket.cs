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
            //  DateTime starting from 1 - 12
            //  Index starts from zero
            var standardMonthIndex = month - 1;

            string[] monthList = new[]
            {
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            };

            if (standardMonthIndex < 0 || standardMonthIndex >= monthList.Length)
            {
                return "-";
            }

            return monthList[standardMonthIndex];
        }
    }
}
