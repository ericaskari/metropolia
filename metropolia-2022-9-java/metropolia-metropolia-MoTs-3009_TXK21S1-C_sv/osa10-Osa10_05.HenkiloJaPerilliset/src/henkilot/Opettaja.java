package henkilot;

public class Opettaja extends Henkilo {
    private final int salary;

    public Opettaja(String fullName, String address, int salary) {
        super(fullName, address);
        this.salary = salary;
    }

    public String toString() {
        return super.toString() + "\n" + "  palkka " + this.salary + " euroa/kk";
    }
}
