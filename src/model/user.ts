/**
 * Class representing an connected user.
 */
export class User {

    public id: string;
    public username: string = 'no-name';
    public room: string = 'no-room';

    constructor(id: string, username: string, room: string) {
        this.id = id;
       

    }

    
}