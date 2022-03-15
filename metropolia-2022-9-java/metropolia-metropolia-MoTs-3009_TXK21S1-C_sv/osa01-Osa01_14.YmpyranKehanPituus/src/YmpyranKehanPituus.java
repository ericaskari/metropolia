
import java.util.Scanner;

public class YmpyranKehanPituus {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Anna ympyrän säde: ");

        double input = Double.parseDouble(scanner.nextLine());

        System.out.printf("Ympyrän kehä: %f", 2 * Math.PI * input);
    }
}
