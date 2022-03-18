public class Sivari implements Palvelusvelvollinen {
    int daysOfService;

    public Sivari() {
        this.daysOfService = 362;
    }

    public int paiviaJaljella() {
        return this.daysOfService;
    }

    public void palvele() {
        if (this.daysOfService > 0) {
            this.daysOfService--;
        }
    }
}
