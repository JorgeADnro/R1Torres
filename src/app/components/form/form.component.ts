import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aspirante } from 'src/app/models/aspirante';
import { Ciudad } from 'src/app/models/ciudad';
import { Bachiller } from 'src/app/models/bachiller';
import { Carrera } from 'src/app/models/carrera';
import { Especialidad } from 'src/app/models/especialidad';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AspiranteServices } from 'src/app/services/aspirante.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  aspiranteForm: FormGroup;
  id: string | null;
  private fileTmp:any;
  fileTypes: { [key: string]: string } = {};

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    public sanitizer: DomSanitizer,
    private _aspiranteService: AspiranteServices,
    private aRoute: ActivatedRoute) {
    this.fileTmp = {};
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

    this.fileTypes['foto'] = 'image/jpeg';
    this.fileTypes['cert'] = 'application/pdf';
    this.fileTypes['compDom'] = 'application/pdf';
  }
  ngOnInit(): void {
    this.obtenerAspirantes();
    this.obtenerCiudades();
    this.obtenerBachiller();
    this.obtenerCarrera();
    this.obtenerEspecialidad();
  }

  getFile($event: any, fieldName: string): void {
  const [file] = $event.target.files;

  // Asegúrate de que fileTypes[fieldName] exista antes de intentar leerlo
  if (!this.fileTypes[fieldName]) {
    console.error(`Tipo de archivo para ${fieldName} no está configurado.`);
    return;
  }

  // Crea un nuevo Blob con el mismo contenido y establece el nuevo tipo
  const modifiedBlob = new Blob([file], { type: this.fileTypes[fieldName] });

  // Asegúrate de que fileTmp[fieldName] exista antes de intentar asignarle propiedades
  if (!this.fileTmp[fieldName]) {
    this.fileTmp[fieldName] = {};
  }

  this.fileTmp[fieldName].fileRaw = modifiedBlob;
  this.fileTmp[fieldName].fileType = this.fileTypes[fieldName];
}

  sendFiles():void{

    const body = new FormData();

    body.append('nom',this.aspiranteForm.get('nom')?.value);
    body.append('apeP',this.aspiranteForm.get('apeP')?.value);
    body.append('apeM',this.aspiranteForm.get('apeM')?.value);
    body.append('calle',this.aspiranteForm.get('calle')?.value);
    body.append('no',this.aspiranteForm.get('no')?.value);
    body.append('col',this.aspiranteForm.get('col')?.value);
    body.append('ciudad',this.aspiranteForm.get('ciudad')?.value);
    body.append('numTelCa',this.aspiranteForm.get('numTelCa')?.value);
    body.append('numTelAsp',this.aspiranteForm.get('numTelAsp')?.value);
    body.append('numTelMaPa',this.aspiranteForm.get('numTelMaPa')?.value);
    body.append('mail',this.aspiranteForm.get('mail')?.value);
    body.append('nomBach',this.aspiranteForm.get('nomBach')?.value);
    body.append('promBach',this.aspiranteForm.get('promBach')?.value);
    body.append('espCur',this.aspiranteForm.get('espCur')?.value);
    body.append('nomMa',this.aspiranteForm.get('nomMa')?.value);
    body.append('apePMa',this.aspiranteForm.get('apePMa')?.value);
    body.append('apeMMa',this.aspiranteForm.get('apeMMa')?.value);
    body.append('nomPa',this.aspiranteForm.get('nomPa')?.value);
    body.append('apePPa',this.aspiranteForm.get('apePPa')?.value);
    body.append('apeMPa',this.aspiranteForm.get('apeMPa')?.value);
    body.append('carrCur',this.aspiranteForm.get('carrCur')?.value);
    body.append('foto', this.fileTmp['foto'].fileRaw, this.fileTmp['foto'].fileType);
    body.append('cert', this.fileTmp['cert'].fileRaw, this.fileTmp['cert'].fileType);
    body.append('compDom', this.fileTmp['compDom'].fileRaw, this.fileTmp['compDom'].fileType);

    this._aspiranteService.guardarAspirante(body).subscribe(res => console.log(res));

  }

  getBufferImageSrc(buffer: ArrayBuffer): SafeUrl {
    const blob = new Blob([buffer]);
    const imageUrl = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
}

getSanitizedImageUrl(base64String: string, imageType: string): SafeUrl {
    const imageUrl = `data:image/${imageType};base64,${base64String}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
}
  

  listAspirante: Aspirante[] = [];


  obtenerAspirantes() {
    this._aspiranteService.getAspirantes().subscribe(data => {
      console.log(data);
      this.listAspirante = data;
    },error => {
      console.log(error);
    })
  }

  listCiudad: Ciudad[] = [];

  obtenerCiudades() {
    this._aspiranteService.getCiudades().subscribe(data => {
      console.log(data);
      this.listCiudad = data;
    },error => {
      console.log(error);
    })
    
  }

  listBachiller: Bachiller[] = [];

  obtenerBachiller() {
    this._aspiranteService.getBachiller().subscribe(data => {
      console.log(data);
      this.listBachiller = data;
    },error => {
      console.log(error);
    })
    
  }

  listCarrera: Carrera[] = [];

  obtenerCarrera() {
    this._aspiranteService.getCarrera().subscribe(data => {
      console.log(data);
      this.listCarrera = data;
    },error => {
      console.log(error);
    })
    
  }

  listEspecialidad: Especialidad[] = [];

  obtenerEspecialidad() {
    this._aspiranteService.getEspecialidad().subscribe(data => {
      console.log(data);
      this.listEspecialidad = data;
    },error => {
      console.log(error);
    })
    
  }
  
}
