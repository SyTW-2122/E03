import { Deserializable } from './deserializable.model';

// He cambiado los parametros del usuario para hacerlos coincidir con el backend ya que hay
// algunos que aún no se si implementarlos.
export class User implements Deserializable {
    public username: string;
    public email: string;
    private password: string;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    toString() {
        return 'Nombre de Usuario: ' + this.username + '\n'  
        + 'Correo Electronico: ' + this.email + '\n';
    }
}