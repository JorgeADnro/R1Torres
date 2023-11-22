import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aspirante } from '../models/aspirante';
const requestOptions = {
    withCredentials: true,
  };

@Injectable({
  providedIn: 'root'
})
export class AspiranteServices {
  constructor(private http:HttpClient) {  }

  getAspirantes(): Observable<any>{
    return this.http.get<any[]>('http://localhost:9000/api/asps',requestOptions);
  }

  getCiudades(): Observable<any>{
    return this.http.get<any[]>('http://localhost:9000/api/asps/ciu',requestOptions);
  }

  getBachiller(): Observable<any>{
    return this.http.get<any[]>('http://localhost:9000/api/asps/bach',requestOptions);
  }

  getCarrera(): Observable<any>{
    return this.http.get<any[]>('http://localhost:9000/api/asps/carr',requestOptions);
  }

  getEspecialidad(): Observable<any>{
    return this.http.get<any[]>('http://localhost:9000/api/asps/esp',requestOptions);
  }

  guardarAspirante(aspirante: Aspirante): Observable<any>{
    return this.http.post('http://localhost:9000/api/asps',aspirante);
  }

  obtenerAspirante(id: string): Observable<any>{
    return this.http.get('http://localhost:9000/api/asps' + id);
  }

}
