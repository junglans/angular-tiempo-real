import { User } from "./user";


export class UserList {

    private list: Map<string, User> = new Map<string, User>();

    constructor() {}

    /**
     * This method adds a user to the list.
     * @param user   
     */
    public add(user: User): User {

        if (user) {
            this.list.set(user.id, user);
        }

        return user;
    }
    /**
     * This method gets the user from its id.
     * @param id The user's id.
     */
    public getUser(id: string): User | undefined {
        return this.list.get(id);
    }
    /**
     * This method updates the user's name
     * @param id The id of the user whose name is going to be changed
     * @param username The new user's name.
     */
    public updateUsername(id: string, username: string): void {

        const user = this.list.get(id);
        if (user) {
            user.username = username;
        }
    }

    /**
     * This method updates the user's room name.
     * @param id The id of the user whose name is going to be changed.
     * @param roomname the new room's name
     */
    public updateRoom(id: string, roomname: string): void {

        const user = this.list.get(id);
        if (user) {
            user.room = roomname;
        }
    }

    /**
     * Return the list with all the connected users.
     */
    public getUserList(): User[] {
        return Array.from<User>( this.list.values() ); 
    }
    /**
     * This method returs a list of user belonging to a room
     * @param room The name of the room.
     */
    public getUserRoomList(room: string): User[] {
        return this.getUserList().filter(item => item.room === room);
    }

    public deleteUser(id: string): void {
        
        const user: User | undefined = this.getUser(id);
        if (user) {
             this.list.delete(id);
             console.log (`User ${user.id} has been deleted.`);
        } else {
            console.log (`User with id: ${id} has not been found.`);
        }
       
    }
}