import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import * as firebase from 'firebase';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {
  public posts: Post[];
  constructor(private db: DbService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      this.atualizarPublicacoes();
    });
  }

  atualizarPublicacoes() {
    this.db.consultarPosts()
    .then(posts => {
      this.posts = posts;
    });
  }

}
