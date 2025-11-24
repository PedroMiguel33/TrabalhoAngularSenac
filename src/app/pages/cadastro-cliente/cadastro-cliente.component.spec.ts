import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CadastroClienteComponent } from './cadastro-cliente.component';

describe('CadastroClienteComponent', () => {
  let component: CadastroClienteComponent;
  let fixture: ComponentFixture<CadastroClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroClienteComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    expect(component.clienteForm.valid).toBeFalsy();
  });

  it('should validate required fields', () => {
    component.clienteForm.controls['nome'].setValue('');
    component.clienteForm.controls['email'].setValue('');
    expect(component.clienteForm.valid).toBeFalsy();
    component.clienteForm.controls['nome'].setValue('Teste');
    component.clienteForm.controls['email'].setValue('teste@email.com');
    expect(component.clienteForm.valid).toBeTruthy();
  });

  it('should set sucesso to true on cadastrarCliente', () => {
    component.clienteForm.controls['nome'].setValue('Teste');
    component.clienteForm.controls['email'].setValue('teste@email.com');
    component.cadastrarCliente();
    expect(component.sucesso).toBeTrue();
  });
});
