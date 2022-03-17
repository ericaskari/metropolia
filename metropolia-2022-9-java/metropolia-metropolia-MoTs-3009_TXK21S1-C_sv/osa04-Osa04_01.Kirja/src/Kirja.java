public class Kirja {
    private String kirjailija;
    private String nimi;
    private int sivuja;


    public Kirja(String kirjailija, String nimi, int sivuja) {
        this.kirjailija = kirjailija;
        this.nimi = nimi;
        this.sivuja = sivuja;
    }

    public String getKirjailija() {
        return this.kirjailija;
    }

    public String getNimi() {
        return this.nimi;

    }

    public int getSivuja() {
        return this.sivuja;
    }

    public String toString() {
        return this.kirjailija + ", " + this.nimi + ", " + this.sivuja + " sivua";
    }
}
