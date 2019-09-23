export class Question {
    public id: string;
    public input: string;
    public output: string;
    public angaben: string[];
    public anleitung: string;

    constructor({ input, output, angaben, anleitung }: { input: string; output: string; angaben: string[], anleitung: string }) {
        this.input = input;
        this.output = output;
        this.angaben = angaben;
        this.anleitung = anleitung;
    }
}