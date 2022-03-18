import java.util.ArrayList;

public class Puhelinmuistio {

    private final ArrayList<Henkilo> people = new ArrayList<>();

    public void lisaa(String nimi, String numero) {
        this.people.add(new Henkilo(nimi, numero));
    }

    public void tulostaKaikki() {
        this.people
                .stream()
                .map(Henkilo::toString)
                .forEach(System.out::println);
    }

    public String haeNumero(String nimi) {
        Henkilo henkilo = this.people
                .stream()
                .filter(x -> x.getName().equals(nimi))
                .findAny()
                .orElse(null);


        if (henkilo == null) {
            return "numero ei tiedossa";
        }

        return henkilo.haeNumero();
    }

}
