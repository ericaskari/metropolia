import java.util.ArrayList;

public class Ruokalista {

    private final ArrayList<String> ateriat;

    public Ruokalista() {
        this.ateriat = new ArrayList<>();
    }

    public void lisaaAteria(String ateria) {
        if (!ateriat.contains(ateria)) {
            this.ateriat.add(ateria);
        }
    }

    public void tulostaAteriat() {
        ateriat.forEach(ateria -> System.out.println(ateria + " lisätty ateria"));
    }

    public void tyhjennaRuokalista() {
        this.ateriat.clear();
    }
    // toteuta tänne tarvittavat metodit
}
