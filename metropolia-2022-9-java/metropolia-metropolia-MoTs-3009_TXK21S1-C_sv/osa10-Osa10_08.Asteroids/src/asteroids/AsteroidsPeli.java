package asteroids;

import asteroids.domain.Alus;
import asteroids.domain.Ammus;
import asteroids.domain.Asteroidi;
import asteroids.domain.Piste;
import asteroids.domain.Tahti;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import javafx.scene.canvas.GraphicsContext;

public class AsteroidsPeli {

    private Random arpoja;

    private boolean vasemmallePohjassa;
    private boolean oikeallePohjassa;
    private boolean kaasuPohjassa;

    private Alus alus;
    private List<Asteroidi> asteroidit;
    private List<Ammus> ammukset;
    private List<Tahti> tahdet;

    private int leveys;
    private int korkeus;

    private boolean peliLoppui;

    public AsteroidsPeli(int leveys, int korkeus) {
        this.leveys = leveys;
        this.korkeus = korkeus;

        this.arpoja = new Random();

        Piste[] aluksenHahmo = new Piste[3];
        aluksenHahmo[0] = new Piste(-10, 5);
        aluksenHahmo[1] = new Piste(10, 0);
        aluksenHahmo[2] = new Piste(-10, -5);
        alus = new Alus(aluksenHahmo);

        this.vasemmallePohjassa = false;
        this.oikeallePohjassa = false;
        this.kaasuPohjassa = false;

        this.peliLoppui = false;

        this.asteroidit = new ArrayList<>();
        this.asteroidit.add(luoAsteroidi());
        this.asteroidit.add(luoAsteroidi());
        this.asteroidit.add(luoAsteroidi());
        this.asteroidit.add(luoAsteroidi());

        this.ammukset = new ArrayList<>();
        this.tahdet = new ArrayList<>();

        // lisätään kartalle satunnaisia tähtiä
        Random arpa = new Random();
        for (int i = 0; i < 20; i++) {
            Tahti t = new Tahti(new Piste(arpa.nextInt(this.leveys), arpa.nextInt(this.korkeus)));
            this.tahdet.add(t);
        }

    }

    private Asteroidi luoAsteroidi(Piste sijainti) {
        Piste[] hahmo = new Piste[4];
        hahmo[0] = new Piste(-20, 10);
        hahmo[1] = new Piste(42, 6);
        hahmo[2] = new Piste(14, -8);
        hahmo[3] = new Piste(-28, -14);

        Piste liike = new Piste((arpoja.nextDouble() - arpoja.nextDouble()) * 2, (arpoja.nextDouble() - arpoja.nextDouble()) * 2);

        return new Asteroidi(hahmo, sijainti.klooni(), liike, (arpoja.nextDouble() - arpoja.nextDouble()) * 2, arpoja.nextInt(720) - 360);
    }

    private Asteroidi luoAsteroidi() {
        Piste sijainti = new Piste(arpoja.nextInt(leveys), arpoja.nextInt(korkeus));
        return luoAsteroidi(sijainti);
    }

    public void piirra(GraphicsContext gc) {
        this.tahdet.forEach(tahti -> tahti.piirra(gc));
        this.alus.piirra(gc);
        this.asteroidit.forEach(asteroidi -> asteroidi.piirra(gc));
        this.ammukset.forEach(ammus -> ammus.piirra(gc));
    }

    public void paivita(long nanosekuntiaViimePaivityksesta) {
        if (this.oikeallePohjassa) {
            this.alus.kaannaOikealle(0.0000001 * nanosekuntiaViimePaivityksesta);
        }

        if (this.vasemmallePohjassa) {
            this.alus.kaannaVasemmalle(0.0000001 * nanosekuntiaViimePaivityksesta);
        }

        if (this.kaasuPohjassa) {
            this.alus.kiihdyta(0.00000001 * nanosekuntiaViimePaivityksesta);
        }

        // liikutaan
        this.alus.liiku(nanosekuntiaViimePaivityksesta);
        this.asteroidit.forEach(a -> a.liiku(nanosekuntiaViimePaivityksesta));
        this.ammukset.forEach(a -> a.liiku(nanosekuntiaViimePaivityksesta));

        // tarkistetaan törmäykset
        // tarkista törmääkö alus asteroidiin
        if (this.asteroidit.stream().filter(a -> a.tormaa(alus)).count() > 0) {
            this.peliLoppui = true;
        }

        // tarkista, törmääkö ammus asteroidiin
        List<Ammus> poistettavatAmmukset = this.ammukset.stream().filter(ammus -> {
            List<Asteroidi> osutut = this.asteroidit.stream().filter(asteroidi -> asteroidi.sisaltaa(ammus.keskipiste())).collect(Collectors.toList());
            if (osutut.size() > 0) {
                Asteroidi osuttu = osutut.get(0);

                this.asteroidit.add(luoAsteroidi(osuttu.getSijainti()));
                this.asteroidit.add(luoAsteroidi(osuttu.getSijainti()));
                this.asteroidit.add(luoAsteroidi(osuttu.getSijainti()));

                this.asteroidit.remove(osuttu);
                return true;
            }

            return false;
        }).collect(Collectors.toList());
        this.ammukset.removeAll(poistettavatAmmukset);

        // varmistetaan, että palat pysyvät alueella
        // varmista, että alus säilyy alueella
        Piste sijainti = this.alus.getSijainti();
        if (sijainti.getX() < 0) {
            sijainti.setX(this.leveys);
        }
        if (sijainti.getX() > this.leveys) {
            sijainti.setX(0);
        }
        if (sijainti.getY() < 0) {
            sijainti.setY(this.korkeus);
        }
        if (sijainti.getY() > this.korkeus) {
            sijainti.setY(0);
        }

        // varmista, että asteroidit säilyvät alueella
        this.asteroidit.stream().forEach(asteroidi -> {
            Piste asteroidinSijainti = asteroidi.getSijainti();
            if (asteroidinSijainti.getX() < 0) {
                asteroidinSijainti.setX(this.leveys);
            }
            if (asteroidinSijainti.getX() > this.leveys) {
                asteroidinSijainti.setX(0);
            }
            if (asteroidinSijainti.getY() < 0) {
                asteroidinSijainti.setY(this.korkeus);
            }
            if (asteroidinSijainti.getY() > this.korkeus) {
                asteroidinSijainti.setY(0);
            }
        });
    }

    public void oikeallePohjassa(boolean oikeallePohjassa) {
        this.oikeallePohjassa = oikeallePohjassa;
    }

    public void vasemmallePohjassa(boolean vasemmallePohjassa) {
        this.vasemmallePohjassa = vasemmallePohjassa;
    }

    public void kaasuPohjassa(boolean kaasuPohjassa) {
        this.kaasuPohjassa = kaasuPohjassa;
    }

    public void ammu() {

        Piste keskipiste = this.alus.keskipiste().klooni();
        keskipiste = new Piste(keskipiste.getX() + this.alus.getSijainti().getX(), keskipiste.getY() + this.alus.getSijainti().getY());

        Ammus ammus = new Ammus(keskipiste, this.alus.getKaannosAsteina());

        this.ammukset.add(ammus);
    }

    public boolean peliLoppui() {
        return peliLoppui;
    }

}
