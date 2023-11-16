import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aspirante } from 'src/app/models/aspirante';
import { AspiranteService } from 'src/app/services/aspirante.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  aspiranteForm: FormGroup;
  id: string | null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _aspiranteService: AspiranteService,
    private aRoute: ActivatedRoute) {
    this.aspiranteForm = this.fb.group({
      nom: ['', Validators.required],
      apeP: ['', Validators.required],
      apeM: ['', Validators.required],
      calle: ['', Validators.required],
      no: ['', Validators.required],
      col: ['', Validators.required],
      ciudad: ['', Validators.required],
      cp: ['', Validators.required],
      numTelCa: ['', Validators.required],
      numTelAsp: ['', Validators.required],
      numTelMaPa: ['', Validators.required],
      mail: ['', Validators.required],
      nomBach: ['', Validators.required],
      promBach: ['', Validators.required],
      espCur: ['', Validators.required],
      nomMa: ['', Validators.required],
      apePMa: ['', Validators.required],
      apeMMa: ['', Validators.required],
      nomPa: ['', Validators.required],
      apePPa: ['', Validators.required],
      apeMPa: ['', Validators.required],
      fechReg: ['', Validators.required],
      carrCur: ['', Validators.required],
      foto: ['',Validators.required],
      cert: ['', Validators.required],
      compDom: ['', Validators.required],
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
  }

  agregarPaciente() {
    console.log(this.aspiranteForm)

    const ASPIRANTE: Aspirante = {
      mat: this.aspiranteForm.get('')?.value,
      nom: this.aspiranteForm.get('nom')?.value,
      apeP: this.aspiranteForm.get('apeP')?.value,
      apeM: this.aspiranteForm.get('apeM')?.value,
      calle: this.aspiranteForm.get('calle')?.value,
      no: this.aspiranteForm.get('no')?.value,
      col: this.aspiranteForm.get('col')?.value,
      ciudad: this.aspiranteForm.get('ciudad')?.value,
      cp: this.aspiranteForm.get('cp')?.value,
      numTelCa: this.aspiranteForm.get('numTelCa')?.value,
      numTelAsp: this.aspiranteForm.get('numTelAsp')?.value,
      numTelMaPa: this.aspiranteForm.get('numTelMaPa')?.value,
      mail: this.aspiranteForm.get('mail')?.value,
      nomBach: this.aspiranteForm.get('nomBach')?.value,
      promBach: this.aspiranteForm.get('promBach')?.value,
      espCur: this.aspiranteForm.get('espCur')?.value,
      nomMa: this.aspiranteForm.get('nomMa')?.value,
      apePMa: this.aspiranteForm.get('apePMa')?.value,
      apeMMa: this.aspiranteForm.get('apeMMa')?.value,
      nomPa: this.aspiranteForm.get('nomPa')?.value,
      apePPa: this.aspiranteForm.get('apePPa')?.value,
      apeMPa: this.aspiranteForm.get('apeMPa')?.value,
      fechReg: this.aspiranteForm.get('fechReg')?.value,
      carrCur: this.aspiranteForm.get('carrCur')?.value,
      foto: this.aspiranteForm.get('foto')?.value,
      cert: this.aspiranteForm.get('cert')?.value,
      compDom: this.aspiranteForm.get('compDom')?.value,
    }

    if (this.id !== null) {
      // editar paciente
      this._aspiranteService.editarAspirante(this.id, ASPIRANTE).subscribe(data => {
        this.toastr.info('El paciente fué actualizado con éxito!', 'Paciente actualizado!');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.aspiranteForm.reset();
      })
    } else {
      //agregar paciente
      this._aspiranteService.guardarAspirante(ASPIRANTE).subscribe(data => {
        this.toastr.success('El paciente fué agregado con éxito!', 'Paciente agregado!');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.aspiranteForm.reset();
      });
    }

    console.log(ASPIRANTE);
  }
}
