import { Deserializable } from './deserializable.model';
import {Theatre} from './theatre.model';

export class Movie implements Deserializable {
    public id: number;
    public title: string;
    public synopsis: string;
    public date: string;
    public showtimes: string;
    public theatre: Theatre[];
    public price: number;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    toString() {
        return 'Id: ' + this.id + '\n' 
        + 'Ttulo: ' + this.title + '\n' 
        + 'Sinopsis: ' + this.synopsis + '\n' 
        + 'Día ' + this.date + '\n'
        + 'Horario ' + this.showtimes + '\n'
        + 'Sala ' + this.theatre + '\n'
        + 'Precio ' + this.price + '\n';
    }
}