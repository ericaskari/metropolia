package asteroids.domain;

import java.util.Arrays;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;

public class Asteroidi extends Monikulmio {

    private Piste liike;
    private double kaannosLiike;

    public Asteroidi(Piste[] kulmat, Piste sijainti, Piste liike, double kaannosLiike, double suuntaAsteina) {
        super(kulmat, sijainti, suuntaAsteina);
        this.liike = liike;
        this.kaannosLiike = kaannosLiike;
    }

    public Piste getSijainti() {
        return sijainti;
    }

    public void liiku(long nanosekuntiaViimePaivityksesta) {
        this.sijainti.setX(this.sijainti.getX() + this.liike.getX());
        this.sijainti.setY(this.sijainti.getY() + this.liike.getY());

        kaanna(this.kaannosLiike);
    }

    public boolean tormaa(Monikulmio toinen) {
        return Arrays.asList(toinen.kulmat()).stream().map(p -> sisaltaa(p)).filter(b -> b == true).count() > 0;
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
