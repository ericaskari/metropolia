using System;
using System.Collections.Generic;

public class Hippo : Animal
{
    public Hippo()
    {
        Console.WriteLine(this.GetType().Name + " created.");
    }
}
