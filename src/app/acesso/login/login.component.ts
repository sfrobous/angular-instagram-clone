import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutenticacaoService } from '../../services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() exibirPainel: EventEmitter<string> = new EventEmitter();
  private formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [ Validators.required ]),
    'senha': new FormControl(null, [ Validators.required ])
  })
  constructor(private authService: AutenticacaoService) { }

  ngOnInit() {
  }

  autenticar(): void {
    this.authService.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha,
    );
  }

  exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }
}
