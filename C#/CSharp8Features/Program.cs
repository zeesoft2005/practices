#region Imports
using CSharp8Features;
using System;
using System.Threading.Tasks;
#endregion

namespace CSharpFeaturesDemo
{
    class Program
    {
        async static Task Main(string[] args)
        {
            Console.WriteLine("\n=== IndicesAndRanges ===");
            IndicesAndRanges.Demo();

            Console.WriteLine("\n=== SwitchExpressions ===");
            SwitchExpressions.Demo();

            Console.WriteLine("\n=== PatternMatching ===");
            PatternMatching.Demo();

            Console.WriteLine("\n=== StaticLocalFunctions ===");
            StaticLocalFunctions.Demo();

            Console.WriteLine("\n=== UsingDeclarations ===");
            UsingDeclarations.Demo();

            Console.WriteLine("\n=== AsyncStreams ===");
            await AsyncStreams.Demo();

            Console.WriteLine("\n=== TargetTypedNew ===");
            TargetTypedNew.Demo();

            Console.WriteLine("\n=== NullCoallescingAssignment ===");
            NullCoallescingAssignment.Demo();

            Console.WriteLine("\n=== DefaultInterfaceMethods ===");
            DefaultInterfaceMethods.Demo();

            Console.WriteLine("\n=== DisposableRefStruct ===");
            DisposableRefStruct.Demo();

            Console.WriteLine("\n=== UnmanagedConstructedTypes ===");
            UnmanagedConstructedTypes.Demo();
        }
    }
}
