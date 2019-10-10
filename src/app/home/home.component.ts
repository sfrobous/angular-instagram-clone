import { Component, OnInit, ViewChild } from '@angular/core';
import { PublicacoesComponent } from './publicacoes/publicacoes.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(PublicacoesComponent, { static: false }) publicacoes: any;

  constructor() { }

  ngOnInit() {
  }

  atualizarPublicacoes () {
    this.publicacoes.atualizarPublicacoes();
  }
}
