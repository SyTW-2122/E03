import { Deserializable } from './deserializable.model';

export class User implements Deserializable {
    public id: number;
    public nickname: string;
    public name: string;
    public email: string;
    private password: string;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    toString() {
        return 'Id: ' + this.id + '\n' 
        + 'Nombre de Usuario: ' + this.nickname + '\n' 
        + 'Nombre: ' + this.name + '\n' 
        + 'Correo Electronico: ' + this.email + '\n';
    }
}