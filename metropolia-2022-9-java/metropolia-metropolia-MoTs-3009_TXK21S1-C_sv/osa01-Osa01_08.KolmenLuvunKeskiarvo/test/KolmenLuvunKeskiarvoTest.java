
import org.junit.Test;
import org.junit.Rule;

import static org.junit.Assert.*;

import fi.helsinki.cs.tmc.edutestutils.Points;
import fi.helsinki.cs.tmc.edutestutils.MockStdio;

@Points("01-08")
public class KolmenLuvunKeskiarvoTest {

    @Rule
    public MockStdio io = new MockStdio();

    @Test
    public void test() {
        KolmenLuvunKeskiarvo.main(new String[0]);
        String out = io.getSysOut();

        assertTrue("Et tulostanut mitään!", out.trim().length() > 0);

        String[] parts = out.trim().replaceAll("[^\\d.-]", " ").trim().split("\\s+");
        assertTrue("Tulosteesi tulee olla muotoa 'eka: A\ntoka: B\nkolmas: C\nkeskiarvo: Z' jollain numeroilla A, B ja C. Nyt se oli: " + out,
                parts.length == 4);

        int a, b, c;
        double d;

        try {
            a = Integer.parseInt(parts[0]);
        } catch (NumberFormatException e) {
            fail("Tulosteessasi ollut merkkijono \"" + parts[0] + "\" ei ole käypä numero!");
            return;
        }

        try {
            b = Integer.parseInt(parts[1]);
        } catch (NumberFormatException e) {
            fail("Tulosteessasi ollut merkkijono \"" + parts[1] + "\" ei ole käypä numero!");
            return;
        }

        try {
            c = Integer.parseInt(parts[2]);
        } catch (NumberFormatException e) {
            fail("Tulosteessasi ollut merkkijono \"" + parts[2] + "\" ei ole käypä numero!");
            return;
        }

        try {
            d = Double.parseDouble(parts[3]);
        } catch (NumberFormatException e) {
            fail("Tulosteessasi ollut merkkijono \"" + parts[3] + "\" ei ole käypä numero!");
            return;
        }

        assertEquals("Ohjelmasi väitti että (" + a + " + " + b + " + " + c + ") / 3.0 on " + d + ", mutta näin ei ole!", (1.0 * a + b + c) / 3.0, d, 0.01);
    }
}
