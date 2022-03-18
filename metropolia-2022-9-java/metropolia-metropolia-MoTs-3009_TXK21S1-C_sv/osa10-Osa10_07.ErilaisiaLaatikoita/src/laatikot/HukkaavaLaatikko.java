package laatikot;

import java.util.ArrayList;

public class HukkaavaLaatikko extends Laatikko {
    private final ArrayList<Tavara> tavarat = new ArrayList<>();

    @Override
    public void lisaa(Tavara tavara) {
        this.tavarat.add(tavara);

    }

    @Override
    public boolean onkoLaatikossa(Tavara tavara) {
        return false;
    }
}
