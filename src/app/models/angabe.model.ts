export class Angabe {
    public id: string;
    public name: string;

    constructor({ id, name }: { id: string, name: string; }) {
        this.name = name;
        this.id = id;
    }
}