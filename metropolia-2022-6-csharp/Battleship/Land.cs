namespace Battleship;

public class Land
{
    private string _name;
    private bool _isHit = false;
    private Ship? _ship = null;
    private LandStatus _landStatus = LandStatus.Free;
    private int _positionX;
    private int _positionY;

    public Land(string name, int positionX, int positionY)
    {
        this._name = name;
        this._positionX = positionX;
        this._positionY = positionY;
    }

    public bool IsFree()
    {
        return this._ship == null;
    }

    public bool HasShip()
    {
        return this._ship != null;
    }

    public bool IsHit()
    {
        return _isHit;
    }

    public bool IsShipHit()
    {
        if (this._ship == null)
        {
            throw new Exception("There is no ship");
        }
        return this._ship.IsHit();
    }

    public void AddShip(Ship ship)
    {
        if (this._ship != null)
        {
            throw new Exception("Ship is already in place");
        }
        this._landStatus = LandStatus.Taken;
        this._ship = ship;
    }

    public void Hit(Ship ship)
    {
        if (_isHit)
        {
            throw new Exception("It's hit already.");
        }

        if (this._ship == null)
        {
            this._landStatus = LandStatus.FreeHit;
        }
        else
        {
            this._ship.Hit();
            this._landStatus = LandStatus.TakenHit;
        }
    }



}