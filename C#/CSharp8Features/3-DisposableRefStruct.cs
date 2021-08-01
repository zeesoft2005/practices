#region Imports
using System;
#endregion

namespace CSharp8Features
{
    public static class DisposableRefStruct
    {
        public static void Demo()
        {
            using (var p = new MyStruct())
            {

            } // p.Dispose() as scope finishes
        }


        public ref struct MyStruct // : IDisposable // ref structs cannot implement interfaces
        {
            // ref struct = struct that can only live on the stack, such as Span<T>
            // ...

            public void Dispose()
            {
                Console.WriteLine("Disposed...");
            }
        }
    }
}


// https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-8#disposable-ref-structs