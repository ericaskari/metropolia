import java.util.Scanner;

public class KirjaimetErikseen {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Anna nimi: ");

        String name = scanner.nextLine();

        for (int i = 0; i < name.length(); i++) {
            System.out.println((i + 1) + ". kirjain: " + name.charAt(i));
        }
    }
}

