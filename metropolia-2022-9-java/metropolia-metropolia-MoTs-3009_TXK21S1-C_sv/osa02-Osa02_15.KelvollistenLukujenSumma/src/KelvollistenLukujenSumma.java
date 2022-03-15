
import java.util.Scanner;

public class KelvollistenLukujenSumma {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int exitNumber = 9999;
        int sum = 0;

        while (true) {
            System.out.println("Syötä luku: ");
            int input = Integer.parseInt(scanner.nextLine());

            if (input == exitNumber) {
                break;
            }

            boolean isEligible = input >= -140 && input <= 20;

            if (isEligible) {
                sum += input;
            } else {
                System.out.println("Kelvoton luku");
            }
        }

        System.out.println("Kelvollisten lukujen summa: " + sum);
    }
}
