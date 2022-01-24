namespace Lab10;

public class FinnishTranslator: Translator
{
    private Dictionary<string, string> _dictionary = new();

    public FinnishTranslator()
    {
        _dictionary.Add("apua", "help");
        _dictionary.Add("punainen", "red");
        _dictionary.Add("sininen", "blue");
        _dictionary.Add("vihreä", "green");
    }

    public new string Translate(string text)
    {
        return _dictionary.GetValueOrDefault(text.ToLower(), "-");
    }
}