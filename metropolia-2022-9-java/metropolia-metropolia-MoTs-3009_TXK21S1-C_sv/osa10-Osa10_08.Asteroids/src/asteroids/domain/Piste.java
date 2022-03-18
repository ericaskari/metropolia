package asteroids.domain;

public class Piste {

    private double x;
    private double y;

    public Piste(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public Piste klooni() {
        return new Piste(this.x, this.y);
    }

    @Override
    public String toString() {
        return "Piste{" + "x=" + x + ", y=" + y + '}';
    }
}
