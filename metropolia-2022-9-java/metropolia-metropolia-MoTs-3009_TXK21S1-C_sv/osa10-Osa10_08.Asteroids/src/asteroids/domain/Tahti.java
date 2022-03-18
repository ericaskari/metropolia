package asteroids.domain;

import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;

public class Tahti {

    private Piste sijainti;
    private double sade;

    public Tahti(Piste sijainti) {
        this.sijainti = sijainti;
        this.sade = 4.0;
    }

    public void piirra(GraphicsContext gc) {
        gc.setFill(Color.GRAY);
        gc.fillOval(this.sijainti.getX(), this.sijainti.getY(), sade, sade);
    }
}
