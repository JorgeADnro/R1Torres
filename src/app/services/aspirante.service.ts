import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aspirante } from '../models/aspirante';

@Injectable({
  providedIn: 'root'
})
export class AspiranteService {
  _url = 'localhost:9000/api/asps/'
  constructor(private http:HttpClient) {  }

  getAspirante(): Observable<any>{
    return this.http.get(this._url);
  }

  eliminarAspirante(id: string): Observable<any> {
    return this.http.delete(this._url + id);
  }

  guardarAspirante(aspirante: Aspirante): Observable<any>{
    return this.http.post(this._url,aspirante);
  }

  obtenerAspirante(id: string): Observable<any>{
    return this.http.get(this._url + id);
  }

  editarAspirante(id: string, aspirante: Aspirante): Observable<any>{
    return this.http.put(this._url + id, aspirante);
  }

}
