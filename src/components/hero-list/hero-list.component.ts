import { Component, Input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { Hero } from 'src/models/Hero';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';
import { HerosService } from 'src/services/heros-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
  standalone: true,
  imports: [
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    CommonModule,
    HeroCardComponent,
  ],
})
export class HeroListComponent {
  @Input() heroList: Observable<Hero[]> | null = null;

  constructor(public modalDialog: MatDialog, private heroService: HerosService) {}
  openHeroDetails(hero: Hero) {
    console.log(hero, 'open');
    this.modalDialog.open(HeroDetailsComponent, {
      width: '65vw',
      maxWidth: '70vw',
      data: { hero },
    }).afterClosed().subscribe(()=>{

    });
  }


}
