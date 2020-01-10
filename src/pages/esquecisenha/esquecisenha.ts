import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/domain/usuario.service';
import { UsuarioDto } from '../../models/usuario.dto';

@IonicPage()
@Component({
  selector: 'page-esquecisenha',
  templateUrl: 'esquecisenha.html',
})
export class EsquecisenhaPage {

  formGroup: FormGroup;
  usuarios : UsuarioDto[]; //declaração de uma coleção de usuários
  
  //criação das instâncias e definição das validações do formulário

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public usuarioService: UsuarioService,
    public formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        //valor inicial e as validações sintáticas
        codigo: ['', [Validators.required, Validators.minLength(3)]],
        cpf:    ['', [Validators.required, Validators.minLength(10)]],
        email:  ['', [Validators.required, Validators.email, Validators.maxLength(50)]]
      });
  }

  //na carga da página, carrega usuário p/ usar no popup

  ionViewDidLoad() {
    this.usuarioService.popup() 
      .subscribe(
        response => { 
          this.usuarios = response; 
          //carrega o campo Código do formulário com o primeiro usuario da lista
          //this.formGroup.controls.codigo.setValue(this.usuarios[0].codigo);
        },
        error => {
          console.log("Erro na carga do popup")
        }); 
  }
  
  enviar() {
    console.log("Enviar dados");
  }

}
