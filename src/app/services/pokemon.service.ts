import { Injectable } from '@angular/core';
import { Data, Resultado } from '../interfaces/pokeApi';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  async getByPage(page: number, size: number = 40):Promise<Resultado[]>{
    const offset = (page-1)*size;
    if(offset > 300) return []
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${size}&offset=${offset}`)
    const resJson = await res.json();
    return resJson.results;
  }

  async getById(id : string | number):Promise<Pokemon>{
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    return await res.json();
  }

  async getDescripcion(id: string | number):Promise<string>{
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    const resJson = await res.json();
    const texto = resJson.flavor_text_entries.find((texto:any) =>  texto.language.name === "es")
    return texto ? texto.flavor_text : "No se econtró descripción en español";
  }
}
