import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  @Output() exibirPainel: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  exibirPainelLogin(): void {
    this.exibirPainel.emit('login');
  }

}
