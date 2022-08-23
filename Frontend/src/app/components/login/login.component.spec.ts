import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ RouterTestingModule, HttpClientModule, FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Se crea el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Hay un formulario de Login con nombre y contraseña', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.querySelector('#Username')).toBeTruthy();
    expect(compiled.querySelector('#Password')).toBeTruthy();
  });

  it('Comprobar los datos de los campos del formulario', () => {
    const compiled = fixture.debugElement.nativeElement;
    compiled.querySelector('#Username').value = "Pedro";
    compiled.querySelector('#Password').value = "Pedro2";
    expect(compiled.querySelector('#Username').value).toEqual("Pedro");
    expect(compiled.querySelector('#Password').value).toEqual("Pedro2");
  });
});