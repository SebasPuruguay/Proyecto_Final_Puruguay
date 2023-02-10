import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Busqueda } from './busqueda.model';
import { BusquedaService } from './busqueda.service';
interface BusRes {
  aerolonia: Busqueda[];
  criteria: string;
}
@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnDestroy{
  criteria: string ='';
  loading: boolean = false;
  criteriaSelected: BusRes = {aerolonia: [],criteria: ''};
  private subResponse: Subscription;
  private loadingResponse: Subscription = Subscription.EMPTY;
  constructor(public busquedaService: BusquedaService){
    this.subResponse = Subscription.EMPTY;
  }

  onCriteriaSelectedFromChild(criteria: number){
    // this.criteriaSelected = criteria;
    switch (criteria) {
      case 0:
        this.criteria='';
        this.criteriaSelected = {aerolonia: [],criteria: this.criteria};
        break;
      case 2:
        this.criteria='Alrededor del mundo';
        this.busquedaService.getGeneralAirlines();//primero
        break;
      case 3:
        this.criteria='Las de Qatar';//este es el segundo
        this.busquedaService.getQatarAirlines();
        break;
      case 4:
        this.criteria='Conocidas en China';//este es el tercero
        this.busquedaService.getChinaAirlines();
        break;
      default:
        break;
    }
    this.loadingResponse = this.busquedaService.getLoading().subscribe(r=>{
      // console.log(r)
      this.loading=r;
    })
    this.subResponse = this.busquedaService.getBusquedaObservable().subscribe((r: Busqueda[])=>{
      this.criteriaSelected = {aerolonia: r, criteria: this.criteria};
    })
  }

  ngOnDestroy(): void {
    console.log('Dejando Componente')
    this.subResponse.unsubscribe();
    this.loadingResponse.unsubscribe();
  }
}
