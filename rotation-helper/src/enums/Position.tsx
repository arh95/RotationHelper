
export class Position {

    
    //'enum' in the sense that it's a static set of vlaues to be accessed. The Javascript/Typescript enum functionality was 
    //lacking when it came to being able to store and access mulitple values on a given enum entry
    //TODO locate stack overflow article for credit


    static readonly SETTER = new Position("S", "Setter");
    static readonly OUTSIDE = new Position("OH", "Outside Hitter");
    static readonly MIDDLE = new Position("M", "Middle Blocker");
    static readonly OPPO = new Position("OPP", "Opposite");
    static readonly DEFSPEC = new Position("DS", "Defensive Specialist");
    static readonly LIBERO = new Position("L", "Libero");
    static readonly SERVESPEC = new Position("SS", "Serving Specialist");
    static readonly NONE = new Position("NONE", "No position specified");

    private constructor(public readonly key: string, public readonly value: string) {

    }

    get getKey(): string {
        return this.key;
    }

    get getLabel(): string {
        return this.value;
    }

    static getValidPositions(): Position[] {
        return [Position.SETTER, Position.OUTSIDE, Position.MIDDLE, Position.OPPO, Position.LIBERO, Position.DEFSPEC, Position.SERVESPEC];
    }

    static getPositionByKey(key: string): Position {
        let position: Position = Position.NONE;
        if (key === Position.SETTER.getKey) {
            position = Position.SETTER;
        } else if (key === Position.OUTSIDE.getKey) {
            position = Position.OUTSIDE;
        } else if (key === Position.MIDDLE.getKey) {
            position = Position.MIDDLE;
        } else if (key === Position.OPPO.getKey) {
            position = Position.OPPO;
        } else if (key === Position.LIBERO.getKey) {
            position = Position.LIBERO;
        } else if (key === Position.DEFSPEC.getKey) {
            position = Position.DEFSPEC;
        } else if (key === Position.SERVESPEC.getKey) {
            position = Position.SERVESPEC;
        }

        return position;
    }
    static getPositionKey(position: Position): string {
        return Object.keys(Position)[Object.values(Position).indexOf(position)];
    }

    static revive(position:Position): Position
    {
        return this.getPositionByKey(position.key);
    }

}




