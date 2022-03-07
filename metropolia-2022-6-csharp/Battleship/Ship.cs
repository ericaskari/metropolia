namespace Battleship;

public class Ship
{
    private string _name;
    private int _width;
    private int _height;
    private bool _isHit = false;
    private ShipPosition _shipPosition;
    private int _positionX;
    private int _positionY;

    public Ship(int width, int height, string name)
    {
        this._name = name;
        this._width = width;
        this._height = height;
    }

    public void PlaceShip(int positionX, int positionY, ShipPosition shipPosition)
    {
        this._positionX = positionX;
        this._positionY = positionY;
        this._shipPosition = shipPosition;
    }

    public void Hit()
    {
        if (_isHit)
        {
            throw new Exception("Ship is already hit");
        }

        _isHit = true;
    }

    public bool IsHit()
    {
        return _isHit;
    }
}