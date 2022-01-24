using System;
using System.Collections.Generic;
class Program
{
    static void Main(string[] args)
    {
        // Create every type of animal object and assign references to a List
        Console.WriteLine("Creating animal objects..");
        List<Animal> animals = new List<Animal> {
            new Dog(),
            new Wolf(),
            new Cat(),
            new Lion(),
            new Tiger(),
            new Hippo()
        };

        // Loop through all animals and do stuff with them
        foreach (Animal a in animals)
        {
            Console.WriteLine();
            a.Eat();
            a.Roam();
            // if animal implements interface Pet it can be used as a Pet 
            if (a is IPet p)
            {
                // or use type casting Animal a to Pet
                // Pet p = (Pet)a;
                p.Beg();
                p.Play();
            }
        }

    }
}
