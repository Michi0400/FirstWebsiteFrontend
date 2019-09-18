export class ShoppingItem {
    public id: string;
    public name: string;

    constructor({ name }: { name: string; }) {
        this.name = name;
    }
}