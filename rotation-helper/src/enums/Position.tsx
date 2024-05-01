

export enum Position {
    OH = "Outside Hitter",
    OPP = "Opposite",
    S = "Setter",
    M = "Middle Blocker",
    L = "Libero",
    DS = "Defensive Specialist",
    SS = "Serving Specialist",
    NONE = "No Position Given"
}
export function getPositionKey(position:Position): string
{
    return Object.keys(Position)[Object.values(Position).indexOf(position)];
}
