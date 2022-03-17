
public class EnsimmainenTilisiirtosi {

    public static void main(String[] args) {
        Tili martinAccount = new Tili("Matin tili", 1000);
        Tili myAccount = new Tili("Oma tili", 0);
        martinAccount.otto(100);
        myAccount.pano(100);

        System.out.println(martinAccount);
        System.out.println(myAccount);
    }
}
