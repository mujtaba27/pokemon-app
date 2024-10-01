import { NgFor, NgIf } from '@angular/common';
import { Component, Pipe } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgFor, MatCard, NgIf],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  pokemonDetails: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.pokemonDetails = this.route.snapshot.data['pokemon'];
  }
}
