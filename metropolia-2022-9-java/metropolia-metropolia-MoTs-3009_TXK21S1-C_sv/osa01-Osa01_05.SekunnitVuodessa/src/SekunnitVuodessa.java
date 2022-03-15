
public class SekunnitVuodessa {

    public static void main(String[] args) {

        // Tässä on hieman puolitiehen jäänyt versio vuoden sekunnit
        // laskevasta ohjelmasta. Korjaapa se!
        int paiviaVuodessa = 365;
        int tuntejaPaivassa = 24;
        int minuuttejaTunnissa = 60;
        int sekuntejaMinuutissa = 60;

        int sekuntejaVuodessa = paiviaVuodessa * tuntejaPaivassa * minuuttejaTunnissa * sekuntejaMinuutissa;

        // ÄLÄ KOSKE TÄHÄN
        System.out.println("Vuodessa on " + sekuntejaVuodessa + " sekuntia.");
    }

}
