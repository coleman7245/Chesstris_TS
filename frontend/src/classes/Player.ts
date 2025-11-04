class Player {
    private _name : string;
    private _email : string;
    private _scores : Array<number>;

    constructor(name : string, email : string, scores : Array<number>) {
        this._name = name;
        this._email = email;
        this._scores = scores;
    };

    get name() : string {
        return this._name;
    };

    get email() : string {
        return this._email;
    };

    get scores() : Array<number> {
        return this._scores;
    };

    set name(name : string) {
        this._name = name;
    };

    set email(email : string) {
        this._email = email;
    };

    set scores(scores : Array<number>) {
        this._scores = scores;
    };
}

export default Player;