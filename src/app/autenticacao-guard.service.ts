import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AutenticacaoService } from './services/autenticacao.service';

@Injectable({
    providedIn: 'root'
  })
export class AutenticacaoGuardService implements CanActivate {
    constructor(private authService: AutenticacaoService) {

    }

    canActivate(): boolean {
        return this.authService.isAuthenticated();
    }
}