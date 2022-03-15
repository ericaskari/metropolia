
import java.util.ArrayList;
import java.util.Optional;
import java.util.Scanner;

public class ListanLukujenSumma {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        ArrayList<Integer> inputList = new ArrayList<>();

        while (true) {
            int input = Integer.parseInt(scanner.nextLine());

            if (input == -1) {
                break;
            }

            inputList.add(input);
        }

        Integer sum = inputList.stream().reduce(0, Integer::sum);

        System.out.println("");
        System.out.println("Summa: " + sum);
    }
}
