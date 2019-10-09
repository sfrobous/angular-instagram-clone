import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DbService } from '../../services/db.service';

@Component({
	selector: 'app-incluir-publicacao',
	templateUrl: './incluir-publicacao.component.html',
	styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {
	private formulario: FormGroup = new FormGroup({
		'titulo': new FormControl(null, [ Validators.required ]),
		'arquivo': new FormControl(null)
	});
	private file: File;
	constructor(private dbService: DbService) { }

	ngOnInit() {
	}

	publicar(): void {
		//console.log(this.formulario.value);
		this.dbService.publicar({
			titulo: this.formulario.value.titulo,
			imagem: this.file
		});
	}

	updateImagemUpload(event: Event): void {
		this.file = (<HTMLInputElement>event.target).files[0];
	}
}
