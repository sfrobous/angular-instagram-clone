import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ProgressoService } from './progresso.service';
import { Post } from '../models/post.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class DbService {    
    constructor(private progresso: ProgressoService) {

    }

    public consultarPosts(): Promise<Array<Post>> {
        let email = firebase.auth().currentUser.email;
        let emailB64 = btoa(email);
        return new Promise(
            (resolve, reject) => {
                let dados: Array<Post> = [];

                firebase.database()
                    .ref(`usuario_detalhe/${emailB64}`)
                    .once('value')
                    .then(usuario => {
                        firebase.database()
                        .ref(`posts/${emailB64}`)
                        .orderByKey()
                        .once('value')
                        .then((snapshot) => {
                            snapshot.forEach(childSnapshot => {
                                dados.push({
                                    key: childSnapshot.key,
                                    titulo: childSnapshot.val().titulo,
                                    url: null,
                                    usuario: usuario.val()
                                });
                            });

                            return dados.reverse();
                        })
                        .then((dados: Post[]) => {
                            dados.forEach(post => {
                                firebase.storage()
                                    .ref()
                                    .child(`imagens/${post.key}`)
                                    .getDownloadURL()
                                    .then((url: string) => {
                                        post.url = url;
                                    });
                            });
                            resolve(dados);
                        });;
                    });

            });
    }

    public publicar(post: any) {
        let email = firebase.auth().currentUser.email;
        
        firebase.database()
            .ref(`posts/${btoa(email)}`)
            .push({ titulo: post.titulo })
            .then((resposta) => {
                let nomeImagem = resposta.key;
                firebase.storage().ref()
                    .child(`imagens/${nomeImagem}`)
                    .put(post.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED, 
                        (snapshot: any) => {
                            this.progresso.status = 'andamento';
                            this.progresso.estado = snapshot;
                        },
                        (error: any) => {
                            this.progresso.status = 'error';
                        },
                        () => {
                            this.progresso.status = 'concluido';
                            console.log('Completou');
                        }); 
            });

        
                
    }
}