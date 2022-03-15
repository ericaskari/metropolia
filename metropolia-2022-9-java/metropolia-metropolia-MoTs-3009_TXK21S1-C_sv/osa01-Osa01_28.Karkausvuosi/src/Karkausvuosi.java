
import java.util.Scanner;

public class Karkausvuosi {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Anna vuosi: ");

        int year = Integer.parseInt(scanner.nextLine());

        if (year % 100 == 0) {
            if (year % 400 == 0) {
                System.out.println("Vuosi on karkausvuosi.");
            } else {
                System.out.println("Vuosi ei ole karkausvuosi.");
            }
        } else if (year % 4 == 0) {
            System.out.println("Vuosi on karkausvuosi.");
        } else {
            System.out.println("Vuosi ei ole karkausvuosi.");
        }
    }
}
