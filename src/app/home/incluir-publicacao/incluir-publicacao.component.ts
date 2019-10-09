import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { Observable, Subject, interval  } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProgressoService } from 'src/app/services/progresso.service';

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
	public progressoUpload: string = 'pendente';
	public percentualProgresso: number = 0;
	constructor(private dbService: DbService,
				private progresso: ProgressoService) { }
				

	ngOnInit() {
	}

	publicar(): void {
		//console.log(this.formulario.value);
		this.dbService.publicar({
			titulo: this.formulario.value.titulo,
			imagem: this.file
		});

		let continua = new Subject();

		let acompanhamentoUpload = interval(250);
		
		acompanhamentoUpload
			.pipe(takeUntil(continua))
			.subscribe(() => {
			console.log(this.progresso.estado);
			this.progressoUpload = 'andamento';
			
			this.percentualProgresso =  Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) * 100);

			if(this.progresso.status !== 'andamento'){
				this.progressoUpload = 'concluido';
				continua.next(false);
			}
		});
	}

	updateImagemUpload(event: Event): void {
		this.file = (<HTMLInputElement>event.target).files[0];
	}
}
