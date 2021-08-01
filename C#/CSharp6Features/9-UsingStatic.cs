using System;
//Static import
using static System.Console;

namespace UsingStatic
{
	class UsingStatic
	{
		static void Main(string[] args)
		{
			//Before C# 6.0
			Console.WriteLine("Foo");

			//C# 6.0 

			WriteLine("Foo");
		}
	}
}
