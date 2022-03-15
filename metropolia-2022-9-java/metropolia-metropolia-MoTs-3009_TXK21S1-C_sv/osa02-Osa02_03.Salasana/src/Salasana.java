
import java.util.Scanner;

public class Salasana {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String salasana = "porkkana"; // käytä porkkanaa salasanana testejä ajaessasi!

        while (true) {
            System.out.println("Anna salasana: ");

            String password = scanner.nextLine();

            if (!password.equals(salasana)) {
                System.out.println("Väärin!");
                continue;
            }

            System.out.println("Oikein!");
            System.out.println("Salaisuus on: znvavbfgv grugl!");
            break;
        }
    }
}

/*
  Anna salasana: satsuma
  Väärin!
  Anna salasana: nauris
  Väärin!
  Anna salasana: lanttu
  Väärin!
  Anna salasana: porkkana
  Oikein!

  Salaisuus on: znvavbfgv grugl!
 */
