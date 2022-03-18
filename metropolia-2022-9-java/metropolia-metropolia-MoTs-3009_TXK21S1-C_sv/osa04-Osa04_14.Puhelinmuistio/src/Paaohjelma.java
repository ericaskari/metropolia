public class Paaohjelma {

    public static void main(String[] args) {
        Henkilo pekka = new Henkilo("Pekka Mikkola", "040-123123");

        System.out.println(pekka.haeNimi());
        System.out.println(pekka.haeNumero());

        System.out.println(pekka);

        pekka.vaihdaNumeroa("050-333444");
        System.out.println(pekka);
    }
}
