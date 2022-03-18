public class Henkilo {

    private final String name;
    private String phoneNumber;

    public Henkilo(String name, String phoneNumber) {
        this.name = name;
        this.phoneNumber = phoneNumber;
    }

    public String getName() {
        return name;
    }

    public String haeNimi() {
        return this.name;
    }


    public String haeNumero() {
        return this.phoneNumber;
    }

    public void vaihdaNumeroa(String uusiNumero) {
        this.phoneNumber = uusiNumero;
    }

    public String toString() {
        return this.name + "  puh: " + this.phoneNumber;
    }
}
