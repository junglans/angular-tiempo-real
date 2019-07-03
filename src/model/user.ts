/**
 * Class representing an connected user.
 */
export class User {

    private _id: string;
    private _username: string = 'no-name';
    private _room: string = 'no-room';

    constructor(id: string) {
        this._id = id;
    }

    public get id(): string {
        return this._id;
    }

    public get username(): string {
        return this._username;
    }

    public set username(username: string) {
        this._username = username;
    }

    public get room(): string {
        return this._room;
    }

    public set room(room: string) {
        this._room = room;
    }

    
}