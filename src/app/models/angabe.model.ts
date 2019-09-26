export class Angabe {
    public id: string;
    public name: string;
    public einheit?: string;
    public menge?: number;

    constructor({ id, name, einheit, menge }: { id: string, name: string, einheit?: string, menge?: number }) {
        this.id = id;
        this.name = name;
        this.einheit = einheit;
        this.menge = menge;
    }
}