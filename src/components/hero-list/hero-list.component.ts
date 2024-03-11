import { Component, Input } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HeroCardComponent } from '../hero-card/hero-card.component';


@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
  standalone: true,
  imports: [MatGridListModule, MatButtonModule, MatCardModule, CommonModule, HeroCardComponent]
})
export class  HeroListComponent {

  @Input() heroList : Array<any> | null = null;

}
