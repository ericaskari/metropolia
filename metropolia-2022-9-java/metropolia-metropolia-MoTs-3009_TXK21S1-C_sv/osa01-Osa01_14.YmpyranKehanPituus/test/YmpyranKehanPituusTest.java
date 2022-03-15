
import fi.helsinki.cs.tmc.edutestutils.MockStdio;
import fi.helsinki.cs.tmc.edutestutils.Points;
import fi.helsinki.cs.tmc.edutestutils.ReflectionUtils;
import static org.junit.Assert.*;
import org.junit.Rule;
import org.junit.Test;

@Points("01-14")
public class YmpyranKehanPituusTest {

    @Rule
    public MockStdio io = new MockStdio();

    @Test
    public void testYmpyranKehanPituus() {
        testYmpyranKehanPituus(3);
    }

    private void testYmpyranKehanPituus(int sade) {
        ReflectionUtils.newInstanceOfClass(YmpyranKehanPituus.class);
        io.setSysIn(sade + "\n");
        YmpyranKehanPituus.main(new String[0]);

        String out = io.getSysOut();

        assertTrue("Et kysynyt käyttäjältä mitään!", out.trim().length() > 0);

        assertTrue("Tulosteessasi pitäisi olla teksti \"Ympyrän kehä:\", nyt ei ollut. Tulosteesi oli: " + out,
                out.contains("mpyr") && out.contains("keh"));

        String kehaMjono = out.substring(out.indexOf("keh") + "keh".length());
        while (kehaMjono.length() > 0 && !Character.isDigit(kehaMjono.charAt(0))) {
            kehaMjono = kehaMjono.substring(1);
        }

        double keha;
        try {
            keha = Double.parseDouble(kehaMjono.trim());
        } catch (Exception e) {
            fail("Kirjoita ympyrän kehä tulokseen. Esim: \"Ympyrän kehä: 125.6634\". Tulostit nyt: \"" + kehaMjono + "\".");
            return;
        }

        double oikeatulos = (Math.PI * 2 * sade);
        assertEquals("Ympyrän kehän pituus säteellä " + sade
                + " pitäisi olla " + oikeatulos + ", ehdotit: "
                + kehaMjono.trim(), oikeatulos, keha, 0.001);
    }
}
