#region Imports
using System;
#endregion

namespace CSharp8Features
{
    public class NullCoallescingAssignment
    {
        public static void Demo()
        {
            object o = 10;
            var something = new object();


            // pre-C# 8.0
            if (o == null)
            {
                o = something;
            }


            // C# 8.0 - Null Coallescing Assignment Operator ??=
            o ??= something;

            Console.WriteLine(o);
        }
    }
}
