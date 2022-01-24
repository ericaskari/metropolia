using System;
using System.Collections.Generic;

public abstract class Animal
{
    public void Eat()
    {
        Console.WriteLine("Animal (" + this.GetType().Name + ") eating.");
    }

    // Only virtual methods can be overridden by subclasses
    public virtual void Roam()
    {
        Console.WriteLine("Animal (" + this.GetType().Name + ") roaming around.." );
    }
}