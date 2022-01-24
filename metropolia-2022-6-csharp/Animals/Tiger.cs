using System;
using System.Collections.Generic;

public class Tiger : Feline
{
    public Tiger()
    {
        Console.WriteLine(this.GetType().Name + " created.");
    }
}
