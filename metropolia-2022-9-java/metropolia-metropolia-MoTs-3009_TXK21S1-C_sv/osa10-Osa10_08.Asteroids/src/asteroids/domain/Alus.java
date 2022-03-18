package asteroids.domain;

import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;

public class Alus extends Monikulmio {

    private Piste liike;

    public Alus(Piste[] muoto) {
        super(muoto, new Piste(200, 200), 0);
        this.liike = new Piste(0, 0);
    }

    public void liiku(long nanosekuntiaViimePaivityksesta) {
        this.sijainti.setX(this.sijainti.getX() + this.liike.getX());
        this.sijainti.setY(this.sijainti.getY() + this.liike.getY());
    }

    public double getKaannosAsteina() {
        return kaannosAsteina;
    }

    public Piste getSijainti() {
        return sijainti;
    }

    public Piste getLiike() {
        return liike;
    }

    public void kiihdyta(double kiihdytys) {
        liike.setX(liike.getX() + kiihdytys * Math.cos(Math.toRadians(kaannosAsteina)));
        liike.setY(liike.getY() + kiihdytys * Math.sin(Math.toRadians(kaannosAsteina)));
    }

    public void kaannaVasemmalle(double paljonko) {
        this.kaannosAsteina += paljonko;
    }

    public void kaannaOikealle(double paljonko) {
        this.kaannosAsteina -= paljonko;
    }

    public void piirra(GraphicsContext gc) {
        Piste[] pisteet = kulmat();

        gc.setStroke(Color.WHITE);
        gc.setFill(Color.BLACK);
        gc.setLineWidth(2);

        gc.beginPath();
        gc.moveTo(pisteet[0].getX(), pisteet[0].getY());

        for (int i = 1; i < pisteet.length; i++) {
            gc.lineTo(pisteet[i].getX(), pisteet[i].getY());
        }

        gc.lineTo(pisteet[0].getX(), pisteet[0].getY());
        gc.closePath();

        gc.stroke();
        gc.fill();
    }
}
