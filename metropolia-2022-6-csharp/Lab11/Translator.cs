namespace Lab10;

public abstract class Translator
{
    protected readonly Dictionary<string, string> Dictionary = new();
    public string Translate(string text)
    {
        return Dictionary.GetValueOrDefault(text.ToLower(), "-");
    }
}