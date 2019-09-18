export class Question {
    public id: string;
    public input: string;
    public output: string;

    constructor({ input, output }: { input: string; output: string; }) {
        this.input = input;
        this.output = output;
    }
}