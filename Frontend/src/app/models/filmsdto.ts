export class filmsDTO{
  public name: string;
  public desc: string;
  public gender: string;
  public image: string;

  constructor( name: string, desc: string, gender: string, image: string) {
    this.name = name;
    this.desc = desc;
    this.gender = gender;
    this.image = image;
  }
};