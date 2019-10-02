import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  @Output() exibirPainel: EventEmitter<string> = new EventEmitter();
  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'nome_completo': new FormControl(null),
    'nome': new FormControl(null),
    'senha': new FormControl(null),
  });

  constructor(private authService: AutenticacaoService) { }

  ngOnInit() {
  }

  exibirPainelLogin(): void {
    this.exibirPainel.emit('login');
  }

  cadastrarUsuario(): void {
    let usuario: Usuario = this.formulario.value;
    
    
    this.authService.cadastrarUsuario(usuario)
      .then(this.exibirPainelLogin);
  }
}
