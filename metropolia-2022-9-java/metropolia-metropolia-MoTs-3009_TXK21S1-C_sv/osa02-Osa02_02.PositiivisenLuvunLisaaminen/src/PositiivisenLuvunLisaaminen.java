
import java.util.Scanner;

public class PositiivisenLuvunLisaaminen {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int firstOne = Integer.parseInt(scanner.nextLine());
        int secondOne = Integer.parseInt(scanner.nextLine());
        int result = 0;

        if (secondOne > 0) {
            result = firstOne + secondOne;
        } else {
            result = firstOne;
        }
        
        System.out.println("Summa: " + result);
    }
}
