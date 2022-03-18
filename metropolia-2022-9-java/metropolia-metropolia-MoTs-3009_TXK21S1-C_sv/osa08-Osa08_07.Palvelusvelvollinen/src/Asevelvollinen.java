public class Asevelvollinen implements Palvelusvelvollinen {
    int paivia;

    public Asevelvollinen(int paivia) {
        this.paivia = paivia;
    }

    public int paiviaJaljella() {
        return paivia;
    }

    public void palvele() {
        if (paivia > 0) {
            paivia--;
        }
    }
}
