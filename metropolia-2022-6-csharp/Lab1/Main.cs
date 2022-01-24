namespace Lab1;

public class Main
{
    public void Start()
    {
        Console.WriteLine("Hello, World!");

        Car theCar = new Car ();
        Driver theDriver = new Driver (theCar);

        theDriver.Drive ();
    }
}