import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';

import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private token_id: string;  
  private tokenKey: string = 'instagram-clone-token';
  constructor(private router: Router) { }

  public autenticar(email: string, senha: string): void {
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then((cred: firebase.auth.UserCredential) => {
        cred.user.getIdToken().then((token) => { 
          this.token_id = token;
          localStorage.setItem(this.tokenKey, token);
          this.router.navigate(['/home']);
        });
        console.log(cred);
      })
      .catch(error => console.log(error));
  }

  public cadastrarUsuario(usuario: Usuario) : Promise<any> {    
    return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
    .then((resposta: any) => {
      delete usuario.senha;
      firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
        .set(usuario);
    })
    .catch((error: any) => {
    });

  }

  public isAuthenticated(): boolean {
    if(!this.token_id && localStorage.getItem(this.tokenKey))
      this.token_id = localStorage.getItem(this.tokenKey);

    return !!this.token_id;
  }
}
