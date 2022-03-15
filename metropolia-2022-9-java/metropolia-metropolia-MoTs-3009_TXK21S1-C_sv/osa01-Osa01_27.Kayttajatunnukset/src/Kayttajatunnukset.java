
import java.util.Scanner;

public class Kayttajatunnukset {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String person1Username = "aleksi";
        String person1Password = "tappara";
        String person2Username = "elina";
        String person2Password = "kissa";

        System.out.println("Anna tunnus: ");
        String username = scanner.nextLine();
        System.out.println("Anna salasana: ");
        String password = scanner.nextLine();

        Boolean isPerson1 = username.equals(person1Username) && password.equals(person1Password);
        Boolean isPerson2 = username.equals(person2Username) && password.equals(person2Password);

        if (isPerson1 || isPerson2) {
            System.out.printf("Hei %s, olet kirjautunut järjestelmään", username);
        } else {
            System.out.println("Virheellinen tunnus tai salasana!\n");
        }
    }
}
