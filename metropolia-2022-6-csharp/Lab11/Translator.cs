namespace Lab10;

public abstract class Translator
{
    private readonly Dictionary<string, string> _dictionary = new();

    public Translator()
    {
        _dictionary.Add("Apua", "Help");
        _dictionary.Add("Punainen", "Red");
        _dictionary.Add("Sininen", "Blue");
        _dictionary.Add("Vihreä", "Green");
    }

    public string Translate(string text)
    {
        string result = "";

        _dictionary.TryGetValue(text, out result);

        return result;
    }
}