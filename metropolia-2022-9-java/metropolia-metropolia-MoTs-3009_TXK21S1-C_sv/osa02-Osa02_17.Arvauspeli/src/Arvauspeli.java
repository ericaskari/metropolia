
import java.util.Scanner;

public class Arvauspeli {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int toBeGuessed = 7;
        int guessCount = 0;

        System.out.println("Minäpä tiedän luvun väliltä 1-10, jota sinä et tiedä!\n");

        while (true) {
            System.out.print("Arvaa luku: ");

            int input = Integer.parseInt(scanner.nextLine());

            if (input == toBeGuessed) {
                guessCount += 1;
                break;
            }

            if (input > 10 || input < 1) {
                System.out.println("Epäkelpo luku!");
                continue;
            }

            System.out.println("Ei ollut!");
            guessCount += 1;
        }

        System.out.println("\nOikein! Arvauksia yhteensä: " + guessCount);
    }
}
