namespace Lab1;

public class Driver
{
    private Car myCar;

    public Driver (Car myCar)
    {
        this.myCar = myCar;
    }

    public void Drive () {
        myCar.FillTank ();

        while ( (myCar.GetSpeed() < 50.0) && (myCar.GetGasLevel() >= 0.1) ) {
            myCar.Accelerate();
        }

        while ( myCar.GetSpeed() > 0 )  {
            myCar.Decelerate();
        }

    }

}