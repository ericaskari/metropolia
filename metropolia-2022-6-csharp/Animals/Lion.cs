using System;
using System.Collections.Generic;

public class Lion : Feline
{
    public Lion()
    {
        Console.WriteLine(this.GetType().Name + " created.");
    }
}
