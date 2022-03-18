package asteroids;

import javafx.animation.AnimationTimer;
import javafx.application.Application;
import static javafx.application.Application.launch;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import javafx.scene.paint.Color;
import javafx.stage.Stage;

public class AsteroidsOhjelma extends Application {

    public AsteroidsOhjelma() {
        super();
    }

    @Override
    public void start(Stage stage) {
        final int leveys = 800;
        final int korkeus = 600;

        stage.setTitle("Asteroids");

        Group root = new Group();
        Scene scene = new Scene(root);
        stage.setScene(scene);

        // luodaan piirtämiseen käytettävä alusta ja lisätään se käyttöliittymään
        Canvas piirtoalusta = new Canvas(leveys, korkeus);
        root.getChildren().add(piirtoalusta);

        // luodaan piirtämiseen käytettävä olio
        GraphicsContext piirturi = piirtoalusta.getGraphicsContext2D();

        // luodaan peli
        AsteroidsPeli peli = new AsteroidsPeli(leveys, korkeus);

        // lisätään näppäimistön käsittely ja kytketään se peliin
        scene.addEventHandler(KeyEvent.KEY_PRESSED, (KeyEvent keyEvent) -> {
            if (keyEvent.getCode() == KeyCode.LEFT) {
                peli.oikeallePohjassa(true);
            }

            if (keyEvent.getCode() == KeyCode.RIGHT) {
                peli.vasemmallePohjassa(true);
            }

            if (keyEvent.getCode() == KeyCode.UP) {
                peli.kaasuPohjassa(true);
            }

            if (keyEvent.getCode() == KeyCode.SPACE) {
                peli.ammu();
            }
        });
        scene.addEventHandler(KeyEvent.KEY_RELEASED, (KeyEvent keyEvent) -> {
            if (keyEvent.getCode() == KeyCode.LEFT) {
                peli.oikeallePohjassa(false);
            }

            if (keyEvent.getCode() == KeyCode.RIGHT) {
                peli.vasemmallePohjassa(false);
            }

            if (keyEvent.getCode() == KeyCode.UP) {
                peli.kaasuPohjassa(false);
            }
        });

        new AnimationTimer() {
            // peliä päivitetään ja piirretään noin 30 millisekunnin välein
            private long sleepNanoseconds = 30 * 1000000;
            private long prevTime = 0;

            public void handle(long currentNanoTime) {
                // päivitetään animaatiota noin 30 millisekunnin välein
                if ((currentNanoTime - prevTime) < sleepNanoseconds) {
                    return;
                }
                
                if(peli.peliLoppui()) {
                    this.stop();
                }

                // päivitetään pelitilanne
                peli.paivita(currentNanoTime - prevTime);

                // tyhjennetään ruutu piirron aluksi
                piirturi.setFill(Color.BLACK);
                piirturi.setStroke(Color.BLACK);
                piirturi.fillRect(0, 0, piirtoalusta.getWidth(), piirtoalusta.getHeight());
                
                // piirretään peli
                peli.piirra(piirturi);

                // päivitetään ajastinta
                // älä muuta seuraavaa riviä (prevTime = currentNanoTime;)
                prevTime = currentNanoTime;
            }
        }.start();

        stage.show();

    }

    public static void main(String[] args) {
        launch(args);
    }
}
