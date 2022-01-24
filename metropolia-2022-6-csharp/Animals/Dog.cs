using System;
using System.Collections.Generic;

public class Dog : Canine, IPet
{
    public Dog() : base()
    {
        Console.WriteLine(this.GetType().Name + " created.");
    }

    public void Beg()
    {
        Console.WriteLine("Wufwuf, gimme the pizza now or I take it myself!");
    }

    public void Play()
    {
        Console.WriteLine("Dog is playing!");
    }

}
