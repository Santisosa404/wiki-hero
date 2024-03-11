import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Hero } from 'src/models/Hero';
@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
  standalone:true,
  imports:[CommonModule,MatCardModule,MatButtonModule]
})
export class HeroCardComponent {
  @Input() hero : Hero | null = null;
}
