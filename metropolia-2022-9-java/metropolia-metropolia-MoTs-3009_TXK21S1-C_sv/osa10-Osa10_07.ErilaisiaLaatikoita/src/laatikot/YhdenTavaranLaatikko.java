package laatikot;

public class YhdenTavaranLaatikko extends Laatikko {
    private boolean added = false;

    private Tavara tavara;

    @Override
    public void lisaa(Tavara tavara) {
        if (!added) {
            this.tavara = tavara;
            this.added = true;
        }
    }

    @Override
    public boolean onkoLaatikossa(Tavara tavara) {
        if (this.tavara == null) {
            return false;
        }

        return this.tavara.equals(tavara);
    }

}
