import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnChanges {
 @Input() pokemon? : Pokemon;
 @Input() abierto : boolean = false;
 @Output() cambiarEstadoApertura = new EventEmitter();
 descripcion: string = "";

 constructor(private pokemonService:PokemonService){}


 ngOnChanges(cambio:SimpleChanges){
    if(cambio["pokemon"] && !cambio["pokemon"].isFirstChange()){
        this.pokemonService.getDescripcion(cambio['pokemon'].currentValue.id).then(res =>{
        this.descripcion = res;
      })
    }
 }

 cambiarAbierto(){
  if(this.pokemon) this.cambiarEstadoApertura.emit();
 }

}
