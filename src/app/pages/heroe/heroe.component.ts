import { HeroeModel } from "./../../models/heroe.model";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgForm } from '@angular/forms';
import { HeroesService } from "./../../services/heroes.service";
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel;

  constructor(private heroesServices: HeroesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {
      this.heroesServices.obtenerHeroe(id).subscribe((resp: HeroeModel) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
    } 
  }

  guardar(form: NgForm){
    if(form.invalid){
      console.log('Formulario no válido.');
      return;
    }

    Swal.fire({
      title: 'Espere por favor', text: 'Guardanado información...', icon: 'info', allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.heroe.id) {
      peticion = this.heroesServices.actualizarHeroe(this.heroe);
      //this.heroesServices.actualizarHeroe(this.heroe);
      /*Swal.fire({
        title: '¡Muy bien!', text: 'El héroe ' + this.heroe.nombre + ' se actualizó correctamente.', icon: 'success'
      });*/
    }else{
      peticion = this.heroesServices.crearHeroe(this.heroe);
      //this.heroesServices.crearHeroe(this.heroe);
     /* Swal.fire({
        title: '¡Muy bien!', text: 'El héroe ' + this.heroe.nombre + ' se creó correctamente.', icon: 'success'
      });*/
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: '¡Muy bien!', text: 'El héroe ' + this.heroe.nombre + ' se actualizó correctamente.', icon: 'success'
      });
    });

  }

}