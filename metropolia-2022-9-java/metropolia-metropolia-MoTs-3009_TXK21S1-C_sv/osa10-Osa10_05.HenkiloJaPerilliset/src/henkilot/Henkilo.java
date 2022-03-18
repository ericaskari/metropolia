package henkilot;

public class Henkilo {

    private final String fullName;
    private final String address;

    public Henkilo(String fullName, String address) {
        this.fullName = fullName;
        this.address = address;
    }

    public String toString() {
        return fullName + "\n  " + address;
    }
}
