
public class Kassapaate {


    private double rahaa;  // kassassa olevan käteisen määrä
    private int edulliset; // myytyjen edullisten lounaiden määrä
    private int maukkaat;  // myytyjen maukkaiden lounaiden määrä


    public Kassapaate() {
        this.rahaa = 1000;
        // kassassa on aluksi 1000 euroa rahaa
    }

    public double syoEdullisesti(double maksu) {
        if (maksu < 2.5) {
            return maksu;
        }
        if (rahaa < maksu - 2.5) {
            return maksu;
        }

        rahaa += 2.5;
        this.edulliset++;
        return maksu - 2.5;
    }

    public double syoMaukkaasti(double maksu) {
        if (maksu < 4.30) {
            return maksu;
        }
        if (rahaa < maksu - 4.30) {
            return maksu;
        }

        rahaa += 4.30;
        this.maukkaat++;
        return maksu - 4.30;
    }

    public boolean syoEdullisesti(Maksukortti kortti) {
        if (kortti.saldo() < 2.5) {
            return false;
        }

        kortti.otaRahaa(2.5);

        this.edulliset++;
        return true;
    }

    public boolean syoMaukkaasti(Maksukortti kortti) {
        if (kortti.saldo() < 4.3) {
            return false;
        }

        kortti.otaRahaa(4.3);

        this.maukkaat++;
        return true;
    }

    public void lataaRahaaKortille(Maksukortti kortti, double summa) {
        if (summa > 0) {
            kortti.lataaRahaa(summa);
            this.rahaa += summa;
        }
    }


    @Override
    public String toString() {
        return "kassassa rahaa " + rahaa + " edullisia lounaita myyty " +
               edulliset + " maukkaita lounaita myyty " + maukkaat;
    }
}
