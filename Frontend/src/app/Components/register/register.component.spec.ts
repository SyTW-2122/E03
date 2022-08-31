import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ HttpClientModule, RouterTestingModule, FormsModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Se crea el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Hay un formulario de Login con nombre y contraseña', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.querySelector('#username')).toBeTruthy();
    expect(compiled.querySelector('#email')).toBeTruthy();
    expect(compiled.querySelector('#password')).toBeTruthy();
  });

  it('Comprobar los datos de los campos del formulario', () => {
    const compiled = fixture.debugElement.nativeElement;
    compiled.querySelector('#username').value = "Pedro";
    compiled.querySelector('#email').value = "Pedro@gmail.com";
    compiled.querySelector('#password').value = "Pedro2";
    expect(compiled.querySelector('#username').value).toEqual("Pedro");
    expect(compiled.querySelector('#email').value).toEqual("Pedro@gmail.com");
    expect(compiled.querySelector('#password').value).toEqual("Pedro2");
  });
});
