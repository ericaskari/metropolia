
import java.util.ArrayList;
import java.util.Scanner;

public class LoytyykoListalta {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        ArrayList<String> inputList = new ArrayList<String>();

        while (true) {
            String input = scanner.nextLine();

            if (input.equals("")) {
                break;
            }

            inputList.add(input);
        }

        System.out.print("Ketä etsitään? ");

        String searchString = scanner.nextLine();

        if (inputList.contains(searchString)) {
            System.out.println(searchString + " löytyi!");
        } else {
            System.out.println(searchString + " ei löytynyt!");
        }
    }
}
