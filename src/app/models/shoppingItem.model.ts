export class ShoppingItem {
    public id: string;
    public name: string;
    public einheit?: string;
    public menge?: number;

    constructor({ id, einheit, menge, name }: { id: string, einheit?: string, menge?: number, name: string }) {
        this.id = id;
        this.einheit = einheit;
        this.menge = menge;
        this.name = name;
    }
}