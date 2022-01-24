namespace Lab1;

public class Driver
{
    private Car myCar;

    public Driver (Car myCar)
    {
        Console.WriteLine("Driver: Constructor");
        this.myCar = myCar;
    }

    public void Drive () {
        Console.WriteLine("Driver: Drive");
        myCar.FillTank();

        //   while speed is less that 50 and there is gas left it will accelerate
        while ( (myCar.GetSpeed() < 50.0) && (myCar.GetGasLevel() >= 0.1) ) {
            myCar.Accelerate();
        }

        //   while speed is not zero it will break
        while ( myCar.GetSpeed() > 0 )  {
            myCar.Decelerate();
        }

    }

}