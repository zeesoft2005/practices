﻿using System;

namespace StringInterpolation
{
    class StringInterpolation
    {
        static void Main(string[] args)
        {
            Person person = new Person("Ilkay", "Ilknur");
            //Before C# 6.0
            Console.WriteLine(String.Format("Name={0}, Surname={1}", person.Name, person.Surname));

            //After C# 6.0
            Console.WriteLine($"Name={person.Name}, Surname={person.Surname}");

            //Conditions in string interpolation
            bool foo = true;
            Console.WriteLine($"Name={person.Name},Surname={(foo == true ? person.Surname : "Surname  not found")}");
        }
    }

    class Person
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public Person(string name, string surname)
        {
            Name = name;
            Surname = surname;
        }
    }
}
