public class Henkilo {
    private String nimi;
    private int ika = 0;

    public Henkilo(String nimi) {
        this.nimi = nimi;
    }

    public void vanhene() {
        this.ika += 1;
    }

    public void tulostaHenkilo() {
        System.out.printf("%s, ikä %d vuotta", this.nimi, this.ika);
    }

    public int palautaIka() {
        return this.ika;
    }
}
