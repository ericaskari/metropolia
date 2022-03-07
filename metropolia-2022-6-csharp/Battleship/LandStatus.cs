namespace Battleship;

public enum LandStatus
{
    //  When It's free and nothing has happened yet.
    Free,
    //  When Ship is there.
    Taken,
    //  When it's free and enemy hits the land
    FreeHit,
    //  When it's take and enemy hit's the ship inside
    TakenHit,
    //  When it's placement phase and player cannot select this land(cornered or not enough space)
    UnavailableHighlight,
    //  When it's placement phase and player can select for ship.
    AvailableHighlight
}