public class Tuote {
    private double hinta;
    private int maara;
    private String nimi;

    public Tuote(String nimiAlussa, double hintaAlussa, int maaraAlussa) {
        this.nimi = nimiAlussa;
        this.hinta = hintaAlussa;
        this.maara = maaraAlussa;
    }

    public void tulostaTuote() {
        System.out.printf("%s, hinta %f, %d kpl\n", this.nimi, this.hinta, this.maara);
    }
}
