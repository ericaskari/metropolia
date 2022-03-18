package laatikot;

import java.util.ArrayList;

//  Box with weight limitation
public class MaksimipainollinenLaatikko extends Laatikko {
    private final ArrayList<Tavara> tavarat = new ArrayList<>();
    private final int maksimipaino;
    private int currentWeight;

    public MaksimipainollinenLaatikko(int maksimipaino) {
        super();
        this.maksimipaino = maksimipaino;
    }

    @Override
    public void lisaa(Tavara tavara) {
        int newWeight = this.currentWeight + tavara.getPaino();
        if (newWeight <= maksimipaino) {
            this.tavarat.add(tavara);
            this.currentWeight = newWeight;
        }
    }

    @Override
    public boolean onkoLaatikossa(Tavara tavara) {
        return hasTheBox(tavara);
    }

    private boolean hasTheBox(Tavara tavara) {
        Tavara founded = this.tavarat.stream().filter(tavara::equals).findAny().orElse(null);
        return founded != null;
    }
}
