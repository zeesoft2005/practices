#region Imports
using System.Xml;
#endregion

namespace CSharp8Features
{
    public class TargetTypedNew
    {
        public static void Demo()
        {
            // Current C#
            using (var reader = XmlReader.Create("https://knowledge-base.havit.eu/feed/", new XmlReaderSettings() { IgnoreWhitespace = true }))
            { }

            // Won't make it into the C# 8.0 - currently "C# 9.0 Candidate"
            // using var reader2 = XmlReader.Create("https://knowledge-base.havit.eu/feed/", new() { IgnoreWhitespace = true });

            // Point[] ps = { new (1, 4), new (3,-2), new (9, 5) };
            // List<string> list = new (10);
        }
    }
}
