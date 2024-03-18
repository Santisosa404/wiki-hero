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
  constructor(
    public modalDialog: MatDialog,
    private herosService: HerosService
  ) {}

  handleCreateHero() {
    this.modalDialog
      .open(HeroFormComponent, { width: '65vw', maxWidth: '70vw' })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'true') {
          this.herosService.handleDeleteRequest('').then(() => {
            //TODO Poner loading
            this.modalDialog.closeAll();
          });
        }
      });
  }
}
