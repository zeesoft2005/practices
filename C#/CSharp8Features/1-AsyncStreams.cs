#region Imports
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
#endregion

namespace CSharp8Features
{
    public class AsyncStreams
    {
        public async static Task Demo()
        {
            await using (var x = new MyAsyncDisposable())       // IAsyncDisposable
            {
                await foreach (var i in x.GetBigResultsAsync()) // IAsyncEnumerable 
                {
                    Console.WriteLine(i);
                }
            }
        }

        public class MyAsyncDisposable : IAsyncDisposable
        {
            public async IAsyncEnumerable<int> GetBigResultsAsync()
            {
                await foreach (var result in GetResultsAsync())
                {
                    if (result > 20)
                    {
                        yield return result;
                    }
                }
            }

            public async IAsyncEnumerable<int> GetResultsAsync()
            {
                for (int i = 0; i < 30; i++)
                {
                    await Task.Delay(100);
                    yield return i;
                }
            }

            public async ValueTask DisposeAsync()
            {
                await Task.Delay(200);
                Console.WriteLine("Dispose Async...");
            }
        }
    }
}
