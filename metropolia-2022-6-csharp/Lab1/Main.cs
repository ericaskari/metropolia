namespace Lab1;

public class Main
{
    public void Start()
    {
        Console.WriteLine("Main: Constructor");

        Car theCar = new Car ();
        Driver theDriver = new Driver (theCar);

        theDriver.Drive ();
    }
}