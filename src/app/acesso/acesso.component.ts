import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({
          opacity: 0,
          transform: 'translate(-50px, 0)'
        }),
        animate('500ms 0ms ease-in-out')
      ])
    ]),
    trigger('animacao-painel', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({
          opacity: 0,
          transform: 'translate(100px, 0)'
        }),
        animate('500ms 0ms')
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {
  public estadoBanner: string = 'criado';
  public estadoPainel: string = 'criado';
  public cadastro: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  cadastreSe() {
    this.cadastro = true;
  }

  exibirPainel(painel: string): void {
    this.cadastro = painel === 'cadastro';
  }
}
