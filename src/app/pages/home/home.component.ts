import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';
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

  constructor(
    private pokemon: PokemonService,
){}

  listaPokemons:Resultado[] = []
  pokemonSeleccionado:Pokemon|undefined;
  pagina:number = 1;
  cargando: boolean = false;

  destroy = new Subject();
  destroy$ = this.destroy.asObservable();

  ngOnInit(): void {
    this.cargarLista()
    fromEvent(window, 'scroll').pipe(takeUntil(this.destroy$))
			.subscribe((e: Event) => console.log(this.getYPosition(e)));
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


}
