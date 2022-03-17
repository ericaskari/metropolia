
import java.util.Scanner;

public class Paaohjelma {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Anna lukuja:");
        
        Lukutilasto tilasto = new Lukutilasto();
        Lukutilasto evenNumbers = new Lukutilasto();
        Lukutilasto oddNumbers = new Lukutilasto();

        while (true) {
            int input = Integer.parseInt(scanner.nextLine());

            if (input == -1) {
                break;
            }

            tilasto.lisaaLuku(input);

            if (input % 2 == 0) {
                evenNumbers.lisaaLuku(input);
            } else {
                oddNumbers.lisaaLuku(input);
            }
        }
        
        System.out.println("Määrä: " + tilasto.haeLukujenMaara());
        System.out.println("Summa: " + tilasto.summa());
        System.out.println("Keskiarvo: " + tilasto.keskiarvo());
        System.out.println("Parillisten summa: " + evenNumbers.summa());
        System.out.println("Parittomien summa: " + oddNumbers.summa());
    }
}
