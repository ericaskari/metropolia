package laatikot;

import java.util.Objects;

public class Tavara {

    private final String nimi;
    private final int paino;

    public Tavara(String nimi, int paino) {
        if (paino < 0) {
            throw new IllegalArgumentException();
        }


        this.nimi = nimi;
        this.paino = paino;
    }

    public Tavara(String nimi) {
        this(nimi, 0);
    }

    public String getNimi() {
        return nimi;
    }

    public int getPaino() {
        return paino;
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;

        if (!(object instanceof Tavara)) return false;

        return this.hashCode() == object.hashCode();
    }

    @Override
    public int hashCode() {
        return Objects.hash(nimi);
    }
}
