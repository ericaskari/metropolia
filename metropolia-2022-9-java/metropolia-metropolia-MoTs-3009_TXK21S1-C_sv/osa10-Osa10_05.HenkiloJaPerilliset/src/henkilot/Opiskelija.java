package henkilot;

public class Opiskelija extends Henkilo {
    private int points = 0;

    public Opiskelija(String fullName, String address) {
        super(fullName, address);
    }

    public int opintopisteita() {
        return this.points;
    }

    public void opiskele() {
        points++;
    }

    public String toString() {
        return super.toString() + "\n" + "  opintopisteitä " + this.points;
    }
}
