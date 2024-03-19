import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HerosService } from 'src/services/herosService/heros.service';
import { HeroFormComponent } from '../hero-form/hero-form.component';

@Component({
  selector: 'app-create-hero-button',
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.scss'],
  standalone: true,
  imports: [MatIconModule],
})
export class CreateButtonComponent {
  constructor(public modalDialog: MatDialog) {}

  handleCreateHero() {
    this.modalDialog
      .open(HeroFormComponent, {
        width: '65vw',
        maxWidth: '70vw',
        maxHeight:'95vh'
      })
      .afterClosed()
      .subscribe(() => {
        //TODO Poner loading
        this.modalDialog.closeAll();
      });
  }
}
