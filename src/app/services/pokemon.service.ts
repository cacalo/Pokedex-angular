import { Injectable } from '@angular/core';
import { Data, Resultado } from '../interfaces/pokeApi';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  async getByPage(page: number, size: number = 40):Promise<Resultado[]>{
    const offset = (page-1)*size;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${size}&offset=${offset}`)
    const resJson = await res.json();
    return resJson.results;
  }

  async getById(id : string | number):Promise<Pokemon>{
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    return await res.json();
  }
}
