public class Maksukortti {
    private double saldo;

    public Maksukortti(double saldo) {
        this.saldo = saldo;
    }

    public void syoEdullisesti() {
        if (this.saldo >= 2.60) {
            this.saldo -= 2.60;
        }
    }

    public void syoMaukkaasti() {
        if (this.saldo >= 4.60) {
            this.saldo -= 4.60;
        }
    }

    public void lataaRahaa(double raha) {
        if (raha > 0) {
            this.saldo += raha;
            if (this.saldo > 150) {
                this.saldo = 150;
            }
        }
    }

    public String toString() {
        return "Kortilla on rahaa " + this.saldo + " euroa";
    }
}
