
import fi.helsinki.cs.tmc.edutestutils.MockStdio;
import fi.helsinki.cs.tmc.edutestutils.Points;
import fi.helsinki.cs.tmc.edutestutils.ReflectionUtils;
import java.lang.reflect.Method;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import org.junit.Rule;
import org.junit.Test;

@Points("01-21")
public class ArvosanatJaPisteetTest {

    @Rule
    public MockStdio io = new MockStdio();

    @Test
    public void hylatty1() {
        tarkasta(0, "hylätty", "hyl");
    }

    @Test
    public void hylatty2() {
        tarkasta(42, "hylätty", "hyl");
    }

    @Test
    public void arvos2eka() {
        tarkasta(71, "3", "3");
    }

    @Test
    public void arvos2toka() {
        tarkasta(75, "3", "3");
    }

    @Test
    public void arvos3eka() {
        tarkasta(89, "4", "4");
    }
    
    @Test
    public void arvos3toka() {
        tarkasta(90, "4", "4");
    }

    @Test
    public void vitonen1() {
        tarkasta(91, "5", "5");
    }

    @Test
    public void vitonen2() {
        tarkasta(100, "5", "5");
    }

    @Test
    public void mahdotonta() {
        tarkasta(-1, "mahdotonta!", "mahd");
    }

    @Test
    public void uskomatonta() {
        tarkasta(101, "uskomatonta!", "usk");
    }

    private void tarkasta(int pist, String arvosana, String arvosLyhyt) {
        io.setSysIn(pist + "\n");
        callMain(ArvosanatJaPisteet.class);
        String out = io.getSysOut();

        assertTrue("Ohjelmasi ei tulostanut mitään", out.length() > 0);

        assertTrue(pist + " pisteellä arvosanan pitäisi olla " + arvosana + ", tulostit: " + out, out.toLowerCase().contains("" + arvosLyhyt));

        String[] vaarat = {"mahd", "usk", "hyv", "hyl", "5"};
        for (String vaara : vaarat) {
            if (vaara.equals(arvosLyhyt)) {
                continue;
            }

            assertTrue(pist + " pisteellä arvosanan pitäisi olla " + arvosana + ", tulostit: " + out, !out.toLowerCase().contains("" + vaara));
        }
    }

    private void callMain(Class kl) {
        try {
            kl = ReflectionUtils.newInstanceOfClass(kl);
            String[] t = null;
            String x[] = new String[0];
            Method m = ReflectionUtils.requireMethod(kl, "main", x.getClass());
            ReflectionUtils.invokeMethod(Void.TYPE, m, null, (Object) x);
        } catch (Throwable e) {
            fail(kl + "-luokan public static void main(String[] args) -metodi on hävinnyt!");
        }
    }
}
