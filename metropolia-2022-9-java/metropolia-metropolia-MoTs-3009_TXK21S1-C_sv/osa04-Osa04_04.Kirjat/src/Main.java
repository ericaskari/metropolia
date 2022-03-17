
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        // toteuta tänne toiminnallisuus, jonka avulla käyttäjä voi syöttää
        // kirjoja sekä tarkastella niitä
        List<Kirja> books = new ArrayList<>();

        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.print("Nimi: ");
            String bookNameInput = scanner.nextLine();
            if (bookNameInput.equals("")) {
                break;
            }

            System.out.print("Sivuja: ");
            int pageCountInput = Integer.parseInt(scanner.nextLine());

            System.out.print("Kirjoitusvuosi: ");
            int publishYearInput = Integer.parseInt(scanner.nextLine());

            Kirja kirja = new Kirja(bookNameInput, pageCountInput, publishYearInput);

            books.add(kirja);
        }

        System.out.print("Mitä tulostetaan? ");
        String commandInput = scanner.nextLine();

        if (commandInput.equals("kaikki")) {
            books.forEach(book -> System.out.println(book.toString()));
        } else if (commandInput.equals("nimi")) {
            books.forEach(book -> System.out.println(book.getBookName()));
        }
    }
}
