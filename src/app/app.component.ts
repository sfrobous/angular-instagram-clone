import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'instagram';

  ngOnInit() : void {
    firebase.initializeApp({
      apiKey: "AIzaSyC5Gh98ZWD54J4InmOBwBKuSVkIuXe-PkI",
      authDomain: "jta-instagram-c2fb2.firebaseapp.com",
      databaseURL: "https://jta-instagram-c2fb2.firebaseio.com",
      projectId: "jta-instagram-c2fb2",
      storageBucket: "jta-instagram-c2fb2.appspot.com",
      messagingSenderId: "818834945591",
      appId: "1:818834945591:web:4b9095baa54832972771b2",
      measurementId: "G-W7S83DPKHH"
    });
  }
}
