
export class CompleteAngabe {
    public id: string;

    public name: string;
    public menge: number;
    public einheit: string;

    constructor({ menge, einheit, id, name }: { menge: number, einheit: string, id: string, name: string }) {
        this.menge = menge;
        this.einheit = einheit;
        this.id = id;
        this.name = name;
    }
}