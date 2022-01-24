using System;
using System.Collections.Generic;

public class Wolf : Canine
{
    public Wolf()
    {
        Console.WriteLine(this.GetType().Name + " created.");
    }
}
