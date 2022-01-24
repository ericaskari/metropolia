namespace Lab8
{
    public class Player
    {
        private Dice _dice;


        public Player(Dice dice)
        {
            _dice = dice;
        }

        public int Play()
        {
            return _dice.Throw();
        }
    }
}
