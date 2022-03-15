
import org.junit.Test;
import org.junit.Rule;

import static org.junit.Assert.*;
import fi.helsinki.cs.tmc.edutestutils.Points;
import fi.helsinki.cs.tmc.edutestutils.MockStdio;

@Points("01-01")
public class AdaLovelaceTest {

    @Rule
    public MockStdio io = new MockStdio();

    @Test
    public void test() {
        AdaLovelace.main(new String[0]);
        String out = io.getSysOut();
        assertTrue("Et tulostanut mitään!", out.length() > 0);
        out = out.trim();
        assertTrue("Tulostus oli \"" + out + "\" kun odotettiin \"Ada Lovelace\".", out.equals("Ada Lovelace"));
    }
}
