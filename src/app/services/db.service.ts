import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ProgressoService } from './progresso.service';

@Injectable({
    providedIn: 'root'
})
export class DbService {    
    constructor(private progresso: ProgressoService) {

    }

    public publicar(post: any) {
        let email = firebase.auth().currentUser.email;
        let nomeImagem = Date.now();
        firebase.storage().ref()
            .child(`imagens/${nomeImagem}`)
            .put(post.imagem)
            .on(firebase.storage.TaskEvent.STATE_CHANGED, 
                (snapshot: any) => {
                    this.progresso.status = 'andamento';
                    this.progresso.estado = snapshot;
                    console.log(snapshot);
                },
                (error: any) => {
                    this.progresso.status = 'error';
                    console.log(error);
                },
                () => {
                    this.progresso.status = 'concluido';
                    console.log('Completou');
                });

        // firebase.database()
        //     .ref(`posts/${btoa(email)}`)
        //     .set(post);
    }
}