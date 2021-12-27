import { Deserializable } from './deserializable.model';

export class Menu implements Deserializable {
    public id: number;
    public name: string;
    public price: number;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    toString() {
        return 'Id: ' + this.id + '\n' 
        + 'Nombre: ' + this.name + '\n' 
        + 'Precio ' + this.price + '\n';
    }
}