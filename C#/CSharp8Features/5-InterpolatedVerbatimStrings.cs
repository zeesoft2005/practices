#region Imports
using System;
#endregion

namespace CSharp8Features
{
    public class InterpolatedVerbatimStrings
    {
        public void Demo()
        {
            string s;

            s = "D:\\Demo";                             // string
            s = @"D:\Demo";                             // @ = verbatim string
            s = $"Today {DateTime.Today:g}";            // $ = interpolated string

            s = $@"C# 7 interpolated verbatim string";  // $ must precede @

            s = @$"C# 8 interpolated verbatim string";  // any @$ order


            Console.WriteLine(s);
        }
    }
}
