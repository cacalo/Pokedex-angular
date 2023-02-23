import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Resultado } from 'src/app/interfaces/pokeApi';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  @ViewChild('tarjetas') tarjetasElement!:ElementRef;

  constructor(private pokemon: PokemonService){}

  listaPokemons:Resultado[] = []
  pokemonSeleccionado:Pokemon|undefined;
  pagina:number = 1;
  cargando: boolean = false;
  aperturaDetalle: boolean = false;

  ngOnInit(): void {
    this.cargarLista();
  }

  getYPosition(e:Event): number {
    return (e.target as Element).scrollTop;
 }

  async cargarLista(){
    if(this.cargando) return;
    this.cargando = true;
    this.listaPokemons = [...this.listaPokemons, ...await this.pokemon.getByPage(this.pagina)]
    this.pagina++;
    this.cargando = false;
  }

  onScroll(e:any){
    if(
      Math.round(
      this.tarjetasElement.nativeElement.clientHeight + this.tarjetasElement.nativeElement.scrollTop
      )
      === e.srcElement.scrollHeight){
        this.cargarLista()
      }
  }

  tarjetaClickeada(e:Pokemon){
    if(this.pokemonSeleccionado?.name === e.name)
      return this.aperturaDetalle = !this.aperturaDetalle;
    return this.pokemonSeleccionado = e;
  }

}
