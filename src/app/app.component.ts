import { Component, OnInit, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Observable, filter, map } from 'rxjs';
import { Hero } from 'src/models/Hero';
import { HerosService } from 'src/services/herosService/heros.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'wiki-hero';

  firestore = inject(Firestore);
  constructor(private heroService: HerosService) {}
  heroList: Hero[] | undefined;
  filterValue: string = '';
  ngOnInit(): void {
    this.heroService.getHeroList();
    // this.getData();
    this.heroService.herosListGet.subscribe((heroList) => {
      this.heroList = heroList;
    });
  }

  filterByName(event: any) {   
      this.heroService.herosListGet
        .pipe(
          map((heros) =>
            heros.filter((hero) =>
              hero.name
                .toLocaleLowerCase()
                .includes(event.target.value.toLocaleLowerCase())
            )
          )
        )
        .subscribe((heros) => {
          this.heroList = heros;
        });
    }
}
