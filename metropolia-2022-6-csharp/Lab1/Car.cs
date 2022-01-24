namespace Lab1;

public class Car
{
    private double speed;
    private double gasLevel;

    public Car ()
    {
        Console.WriteLine("CAR: Constructor");
        this.speed = 0.0;
        this.gasLevel = 1.0;
    }

    public double GetSpeed () {
        Console.WriteLine("CAR: GetSpeed");
        return this.speed;
    }

    public double GetGasLevel () {
        Console.WriteLine("CAR: GetGasLevel");
        return this.gasLevel;
    }

    public void Accelerate () {
        Console.WriteLine("CAR: Accelerate");
        Console.WriteLine ($"Start Accelerate Speed is {speed} and gasLevel is {gasLevel}");
        if (this.gasLevel >= 0.1) {
            this.speed = this.speed + 1.0;
            this.gasLevel = this.gasLevel - 0.1;
        }
        Console.WriteLine ($"End   Accelerate Speed is {speed} and gasLevel is {gasLevel}");
    }

    public void Decelerate () {
        Console.WriteLine("CAR: Decelerate");
        Console.WriteLine (".");
        if (this.speed - 1.0 < 0) {
            this.speed = 0.0;

        } else {
            this.speed = this.speed - 1.0;
        }
        Console.WriteLine ("End Decelerate(): " + this.speed + ", " + this.gasLevel);
    }

    public void FillTank () {
        Console.WriteLine("CAR: FillTank");
        this.gasLevel = 20;
    }
}