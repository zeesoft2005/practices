using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DigitSeperators
{
    class DigitSeperators
    {
        static void Main2(string[] args)
        {
            int x = 1_000_000;
            int y = 1000_000;
            double d = 1_2.1_0;

            Console.WriteLine($"X={x}, Y={y}, D={d}");

            //using digit seperators with binary literals.

            int b = 0b1_00_1_0;
            Console.WriteLine($"B={b}");
        }
    }
}
