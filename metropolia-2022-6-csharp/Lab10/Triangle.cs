using System;
namespace Lab10
{
    public class Triangle
    {
        public Triangle(int treeSize)
        {
            Console.WriteLine($"Triangle if size {treeSize} created");

            DrawChristmasTree(treeSize);
        }

        private void DrawStar(int starCount)
        {
            for ( int i = 1 ; i <= starCount; i++ )
            {
                Console.Write("*");
            }

        }

        private void DrawChristmasTree(int height)
        {
            for (int i = 1; i <= height; i++)
            {
                DrawStar(i);
                Console.WriteLine();
            }

        }
    }
}
