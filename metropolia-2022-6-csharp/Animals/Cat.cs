using System;
using System.Collections.Generic;

public class Cat : Feline, IPet
{
    public Cat()
    {
        Console.WriteLine(this.GetType().Name + " created.");
    }

    public override void Roam()
    {
        Console.WriteLine("Cat sneaking...");
    }

    public void Beg()
    {
        Console.WriteLine("Miau, gimme pizza, please!");
    }

    public void Play()
    {
        Console.WriteLine("Cat is playing!");
    }
}
