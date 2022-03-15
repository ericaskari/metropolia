
import java.util.Scanner;

public class Ylinopeussakko {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int speed = Integer.parseInt(scanner.nextLine());

        if (speed > 120) {
            System.out.println("Ylinopeussakko!");
        } else {
            System.out.println(speed);
        }
    }
}
