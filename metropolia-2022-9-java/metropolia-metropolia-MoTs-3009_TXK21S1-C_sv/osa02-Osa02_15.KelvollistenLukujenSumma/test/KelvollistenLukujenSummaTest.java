
import fi.helsinki.cs.tmc.edutestutils.MockStdio;
import fi.helsinki.cs.tmc.edutestutils.Points;
import fi.helsinki.cs.tmc.edutestutils.ReflectionUtils;
import java.lang.reflect.Method;
import java.util.NoSuchElementException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.junit.*;
import static org.junit.Assert.*;

@Points("02-15")
public class KelvollistenLukujenSummaTest {

    @Rule
    public MockStdio io = new MockStdio();

    @Test
    public void testi() {
        int[][] syotteet = {{5, 22, -11, -140, -18, 9999, -164}, {1, 9999, 1}, {9999, 0}, {-3, -2, -1, -141, 9999, -6}};

        for (int i = 0; i < syotteet.length; i++) {
            tarkista(syotteet[i]);
        }
    }

    private void tarkista(int... luvut) {
        int oldOut = io.getSysOut().length();

        String in = "";
        for (int i = 0; i < luvut.length - 1; i++) {
            in += luvut[i] + "\n";
        }

        io.setSysIn(in);
        callMain(KelvollistenLukujenSumma.class);
        String out = io.getSysOut().substring(oldOut);

        assertTrue("et tulosta mitään!", out.length() > 0);

        int vastaus = otaLukuLopusta(out);
        int odotettuVastaus = luvut[luvut.length - 1];
        
        String virheIlm = "Syöte:\n" + in + "\n\n Odotettiin: \"" + odotettuVastaus + "\", tulostit: \"" + vastaus + "\"\n";
        assertEquals(virheIlm, odotettuVastaus, vastaus);
    }

    private void callMain(Class kl) {
        try {
            kl = ReflectionUtils.newInstanceOfClass(kl);
            String[] t = null;
            String x[] = new String[0];
            Method m = ReflectionUtils.requireMethod(kl, "main", x.getClass());
            ReflectionUtils.invokeMethod(Void.TYPE, m, null, (Object) x);
        } catch (NoSuchElementException e) {
            fail("Ohjelmasi koitti lukea liikaa syötettä. Muista lukea nextLine()-metodilla!");
        } catch (Throwable e) {
            fail(kl + "-luokan public static void main(String[] args) -metodi on hävinnyt "
                    + "tai jotain muuta odottamatonta tapahtunut, lisätietoja " + e);
        }
    }

    private static int otaLukuLopusta(String inputStr) {

        String patternStr = "(?s).*?(-?\\d+)\\s*$";

        Matcher matcher = Pattern.compile(patternStr).matcher(inputStr);

        assertTrue("Tulostuksen pitäisi olla muotoa \"Kelvollisten lukujen summa: -167\". Nyt tulostit: " + inputStr, matcher.find());

        int luku = Integer.parseInt(matcher.group(1));
        return luku;
    }
}
