namespace Lab1;

public class Car
{
    private double speed;
    private double gasLevel;

    public Car ()
    {
        this.speed = 0.0;
        this.gasLevel = 1.0;
    }

    public double GetSpeed () {
        return this.speed;
    }

    public double GetGasLevel () {
        return this.gasLevel;
    }

    public void Accelerate () {
        Console.WriteLine ("Begin Accelerate(): " + this.speed + ", " + this.gasLevel);
        if (this.gasLevel >= 0.1) {
            this.speed = this.speed + 1.0;
            this.gasLevel = this.gasLevel - 0.1;
        }
        Console.WriteLine ("End Accelerate(): " + this.speed + ", " + this.gasLevel);
    }

    public void Decelerate () {
        Console.WriteLine (".");
        if (this.speed - 1.0 < 0) {
            this.speed = 0.0;

        } else {
            this.speed = this.speed - 1.0;
        }
        Console.WriteLine ("End Decelerate(): " + this.speed + ", " + this.gasLevel);
    }

    public void FillTank () {
        this.gasLevel = 20;
    }
}