namespace Lab1
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Program: Constructor");
            Main main = new();

            main.Start();
        }
    }
}
