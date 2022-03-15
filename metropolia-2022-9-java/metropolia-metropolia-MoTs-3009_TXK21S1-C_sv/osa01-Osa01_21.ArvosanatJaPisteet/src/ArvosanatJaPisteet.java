
import java.util.Scanner;

public class ArvosanatJaPisteet {

    public static void main(String[] args) {
        System.out.println("Anna pisteet [0-100]: ");

        Scanner scanner = new Scanner(System.in);

        int grade = Integer.parseInt(scanner.nextLine());

        if (grade < 0) {
            System.out.println("mahdotonta!");
        } else if (grade <= 50) {
            System.out.println("hylätty");
        } else if (grade <= 60) {
            System.out.println("1");
        } else if (grade <= 70) {
            System.out.println("2");
        } else if (grade <= 80) {
            System.out.println("3");
        } else if (grade <= 90) {
            System.out.println("4");
        } else if (grade <= 100) {
            System.out.println("5");
        } else {
            System.out.println("uskomatonta!");
        }
    }
}
