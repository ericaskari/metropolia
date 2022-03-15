
import java.util.Scanner;

public class KelvollistenLukujenLukumaara {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int exitNumber = 9999;
        int count = 0;

        while (true) {
            System.out.println("Syötä luku: ");
            int input = Integer.parseInt(scanner.nextLine());

            if (input == exitNumber) {
                break;
            }

            boolean isEligible = input >= -140 && input <= 20;

            if (isEligible) {
                count += 1;
            } else {
                System.out.println("Kelvoton luku");
            }
        }

        System.out.println("Kelvollisia lukuja yhteensä: " + count);
    }
}
