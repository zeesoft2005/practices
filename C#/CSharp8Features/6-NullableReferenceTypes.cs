#region Imports
using System;
#endregion

namespace CSharp8Features
{
    public class NullableReferenceTypes
    {
        // https://github.com/dotnet/csharplang/blob/master/proposals/nullable-reference-types-specification.md
        // .csproj: <Nullable>enable</Nullable>

        public static void Demo()
        {
            string s = null; // warning
            Console.WriteLine(s);


            string? s2 = null; // ok
            Console.WriteLine(s2.Length); // warning


            string? s3 = null; // ok
            Console.WriteLine(s3!.Length); // dammit! ok (null-forgiving operator; no runtime effect)


#nullable disable
            string s4 = null; // ok
            Console.WriteLine(s4);
#nullable restore

        }


        public void DoSomething(string? s)
        {
            if (s != null)
            {
                Console.WriteLine(s.Length); // ok
            }
            Console.WriteLine(s.Length); // warning
        }
    }
}
