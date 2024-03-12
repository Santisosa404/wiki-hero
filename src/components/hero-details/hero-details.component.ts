import {
  Component,
  Inject,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Hero } from 'src/models/Hero';
import { HerosService } from 'src/services/heros-service.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss'],
  standalone: true,
  imports: [MatDialogModule],
})
export class HeroDetailsComponent implements OnInit {
  @ViewChild('removeHeroTemplate')
  removeHeroTemplate!: TemplateRef<any>;
  heroData: Hero | undefined;
  doRemove: boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private herosService: HerosService,
    public modalDialog: MatDialog,
    public modaDialogRef: MatDialogRef<any>
  ) {}

  deleteById(heroId: string) {
    this.modalDialog
      .open(this.removeHeroTemplate, {})
      .afterClosed()
      .subscribe((result) => {
        if (result === 'true') {
          this.herosService.handleDeleteRequest(heroId).then(() => {
            this.modalDialog.closeAll();
          });
        }
      });
  }

  ngOnInit(): void {
    this.heroData = this.data.hero;
  }
}
