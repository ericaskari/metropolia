package henkilot;

import java.util.List;

public class HenkiloTulostus {

    public void tulostaLaitoksenHenkilot(List<Henkilo> henkilot) {
        henkilot.forEach(System.out::println);
    }
}
