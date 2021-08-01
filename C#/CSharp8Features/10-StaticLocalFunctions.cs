#region Imports
using System;
#endregion

namespace CSharp8Features
{
    public class StaticLocalFunctions
    {
        public static void Demo()
        {
            static void DoSomething(object x)
            {
                Console.WriteLine(x.ToString());
            }

            DoSomething("Calling static local function...");
        }
    }
}
