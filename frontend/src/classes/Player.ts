class Player {
    private _name : string;
    private _email : string;
    private _scores : Array<number>;

    public constructor(name : string, email : string, scores : Array<number>) {
        this._name = name;
        this._email = email;
        this._scores = scores;
    };

    public get name() : string {
        return this._name;
    };

    public get email() : string {
        return this._email;
    };

    public get scores() : Array<number> {
        return this._scores;
    };

    public set name(name : string) {
        this._name = name;
    };

    public set email(email : string) {
        this._email = email;
    };

    public set scores(scores : Array<number>) {
        this._scores = scores;
    };
}

export default Player;