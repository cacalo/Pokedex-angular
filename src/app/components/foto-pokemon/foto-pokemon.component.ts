import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-foto-pokemon',
  templateUrl: './foto-pokemon.component.html',
  styleUrls: ['./foto-pokemon.component.scss']
})
export class FotoPokemonComponent {
  @Input() src:string | undefined;
  @Input() alt:string | undefined;
}
