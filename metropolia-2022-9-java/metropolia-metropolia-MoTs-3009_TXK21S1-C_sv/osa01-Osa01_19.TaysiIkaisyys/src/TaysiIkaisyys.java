
import java.util.Scanner;

public class TaysiIkaisyys {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Kuinka vanha olet? ");

        int age = Integer.parseInt(scanner.nextLine());

        if (age >= 18) {
            System.out.println("Olet täysi-ikäinen!");
        } else {
            System.out.println("Et ole täysi-ikäinen!");
        }
    }
}
