import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  constructor() { }

  public cadastrarUsuario(usuario: Usuario) : Observable<Usuario> {
    
    return new Observable<Usuario>(observer => {
      usuario.id = 1;
      observer.next(usuario);
    });
  }
}
