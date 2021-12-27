import { Deserializable } from './deserializable.model';

export class Theatre implements Deserializable {
    public id: number;
    public name: string;
    public seats: string;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    toString() {
        return 'Id: ' + this.id + '\n' 
        + 'Nombre: ' + this.name + '\n' 
        + 'Asiento ' + this.seats + '\n';
    }
}