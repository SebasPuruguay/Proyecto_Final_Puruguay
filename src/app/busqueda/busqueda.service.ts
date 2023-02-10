import { Injectable } from "@angular/core";
import { Busqueda } from "./busqueda.model";
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { BehaviorSubject, Subject } from "rxjs";
import { environment } from '../../environments/environment.development';

// const apiKey = environment.apiKey;
// let headers = new HttpHeaders();
// headers = headers.set('X-Api-Key', apiKey);

@Injectable({providedIn: 'root'})
export class BusquedaService {
  apiKey:string = environment.apiKey;
  headers = new HttpHeaders();
  header = this.headers.set('X-Api-Key', this.apiKey);

  constructor(private http:HttpClient) {}
  private busqueda: Busqueda[] = [];
  private busquedaResults = new Subject<Busqueda[]>();
  public loading = new BehaviorSubject<boolean>(true);
  //https://api-ninjas.com/api/dogs
  getChinaAirlines(){//tercero
    this.loading.next(true)
    this.http.get<Busqueda[]>("https://api.api-ninjas.com/v1/airlines?name=china", {headers: this.header})
      .subscribe((result)=>{
        this.busqueda = result;
        this.busquedaResults.next([...this.busqueda]);
      },
      ()=>{},
      ()=>{
       this.loading.next(false)
      });
  }
  getGeneralAirlines(){//primero
    this.loading.next(true)
    this.http.get<Busqueda[]>("https://api.api-ninjas.com/v1/airlines?name=Air", {headers: this.header})
      .subscribe((result)=>{
        console.log('buscando')
        this.busqueda = result;
        this.busquedaResults.next([...this.busqueda]);
      },
       ()=>{},
       ()=>{
        this.loading.next(false)
       });
  }

  getQatarAirlines(){//segundo
    this.loading.next(true)
    this.http.get<Busqueda[]>("https://api.api-ninjas.com/v1/airlines?name=Qatar", {headers: this.header})
      .subscribe((result)=>{
        this.busqueda = result;
        this.busquedaResults.next([...this.busqueda]);
      },
      ()=>{},
      ()=>{
       this.loading.next(false)
      });
  }



  getBusquedaObservable(){
    return this.busquedaResults.asObservable();
  }

  getLoading(){
    return this.loading;
  }
}
