package asteroids.domain;

import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;

public class Ammus {

    private Piste sijainti;
    private double suuntaAsteina;
    private double sade;

    public Ammus(Piste sijainti, double suuntaAsteina) {
        this.sijainti = sijainti;
        this.suuntaAsteina = suuntaAsteina;
        this.sade = 4.0;
    }

    public boolean sisaltaa(Piste piste) {
        Piste keskipiste = keskipiste();

        return sade <= Math.sqrt((piste.getX() - keskipiste.getX()) * (piste.getX() - keskipiste.getX())
                + (piste.getY() - keskipiste.getY()) * (piste.getY() - keskipiste.getY()));
    }

    public void liiku(long nanosekuntiaViimeLiikkeesta) {
        double nopeus = 0.0000005 * nanosekuntiaViimeLiikkeesta;
        this.sijainti.setX(this.sijainti.getX() + nopeus * Math.cos(Math.toRadians(suuntaAsteina)));
        this.sijainti.setY(this.sijainti.getY() + nopeus * Math.sin(Math.toRadians(suuntaAsteina)));
    }

    public Piste keskipiste() {
        return new Piste(this.sijainti.getX() + sade, this.sijainti.getY() + sade);
    }

    public void piirra(GraphicsContext gc) {
        gc.setFill(Color.WHITE);
        gc.fillOval(this.sijainti.getX(), this.sijainti.getY(), sade, sade);

    }

}
