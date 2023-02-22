import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Resultado } from 'src/app/interfaces/pokeApi';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-tarjeta-pokemon',
  templateUrl: './tarjeta-pokemon.component.html',
  styleUrls: ['./tarjeta-pokemon.component.scss']
})
export class TarjetaPokemonComponent implements OnInit{

  constructor(private pokemon:PokemonService){}

 ngOnInit(): void {
  console.log(this.data.url);
  this.id = this.data.url.substring(34, this.data.url.length-1);
  this.pokemon.getById(this.id).then(res => this.fullData = res);
 }
 fullData:Pokemon|undefined;
 @Input() data:Resultado = {
   name: '',
   url: ''
 }
 @Input() seleccionado:boolean = false;
 @Output() clicked = new EventEmitter<Pokemon>();
 id:string = "0";

 selected(){
  if(this.fullData) this.clicked.next(this.fullData);
 }


}
