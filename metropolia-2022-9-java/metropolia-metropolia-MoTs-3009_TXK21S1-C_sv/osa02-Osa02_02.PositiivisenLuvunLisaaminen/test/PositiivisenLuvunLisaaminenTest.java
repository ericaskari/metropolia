
import fi.helsinki.cs.tmc.edutestutils.MockStdio;
import fi.helsinki.cs.tmc.edutestutils.Points;
import fi.helsinki.cs.tmc.edutestutils.ReflectionUtils;
import java.lang.reflect.Method;
import java.util.NoSuchElementException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import static org.junit.Assert.*;
import org.junit.Rule;
import org.junit.Test;

@Points("02-02")
public class PositiivisenLuvunLisaaminenTest {

    @Rule
    public MockStdio io = new MockStdio();

    @Test
    public void testi() {
        int[][] syotteet = {{3, 6}, {4, -2}, {9, -3}};

        for (int[] syote : syotteet) {
            tarkista(syote);
        }
    }

    private void tarkista(int[] syoteLuvut) {
        int oldOut = io.getSysOut().length();
        String syote = syoteLuvut[0] + "\n" + syoteLuvut[1] + "\n";

        int summa = syoteLuvut[0];
        if (syoteLuvut[1] > 0) {
            summa += syoteLuvut[1];
        }

        io.setSysIn(syote);
        callMain(PositiivisenLuvunLisaaminen.class);
        String out = io.getSysOut().substring(oldOut);

        int vastaus = otaLukuLopusta(out);

        syote = syote.replaceAll("\n", " ").trim();
        syote = syote.replaceAll(" ", " + ").trim();
        String virheIlm = "summan " + syote + " pitäisi olla " + summa + " tulostit \"" + vastaus + "\"";
        assertTrue("et tulosta mitään!", out.length() > 0);
        assertEquals(virheIlm, summa, vastaus);
    }

    private void callMain(Class kl) {
        try {
            kl = ReflectionUtils.newInstanceOfClass(kl);
            String x[] = new String[0];
            Method m = ReflectionUtils.requireMethod(kl, "main", x.getClass());
            ReflectionUtils.invokeMethod(Void.TYPE, m, null, (Object) x);
        } catch (NoSuchElementException e) {
            fail("muista lukea syötteet nextLine()-metodilla");
        } catch (Throwable e) {
            fail(kl + "-luokan public static void main(String[] args) -metodi on hävinnyt!");
        }
    }

    private static int otaLukuLopusta(String inputStr) {
        String patternStr = "(?s).*?(\\d+)\\s*$";

        Matcher matcher = Pattern.compile(patternStr).matcher(inputStr);

        assertTrue("tulostuksen pitäisi olla muotoa \"Summa: 10\"", matcher.find());

        int luku = Integer.parseInt(matcher.group(1));
        return luku;
    }
}
