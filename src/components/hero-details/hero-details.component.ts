import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Hero } from 'src/models/Hero';
import { HerosService } from 'src/services/herosService/heros.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss'],
  standalone: true,
  imports: [MatDialogModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class HeroDetailsComponent implements OnInit {
  @ViewChild('removeHeroTemplate')
  removeHeroTemplate!: TemplateRef<any>;
  heroData: Hero | undefined;
  doRemove: boolean = true;
  isEditing: boolean = false;
  heroForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private herosService: HerosService,
    public modalDialog: MatDialog,
    public modaDialogRef: MatDialogRef<any>,
    private formBuild: FormBuilder,
    private loader: NgxUiLoaderService
  ) {
    this.heroForm = this.formBuild.group({
      realName: ['', Validators.required],
      aliases: [''],
      placeOfBirth: [''],
      firstAppareance: [''],
      occupation: [''],
      eyeColor: [''],
      gender: [''],
      race: [''],
      height: [''],
      weight: [''],
    });
  }
  ngOnInit(): void {
    this.heroData = this.data.hero;
    this.heroForm.patchValue({
      realName: this.heroData?.biography.realName,
      aliases: this.heroData?.biography.aliases,
      placeOfBirth: this.heroData?.biography.placeOfBirth,
      firstAppareance: this.heroData?.biography.firstAppareance,
      occupation: this.heroData?.work.occupation,
      eyeColor: this.heroData?.appearance.eyeColor,
      gender: this.heroData?.appearance?.gender,
      race: this.heroData?.appearance?.race,
      height: this.heroData?.appearance?.height,
      weight: this.heroData?.appearance?.weight,
    });
  }

  changeToEdit() {
    this.isEditing = !this.isEditing;
  }

  deleteById(heroId: string) {
    this.modalDialog
      .open(this.removeHeroTemplate, {})
      .afterClosed().subscribe((result) => {
        if (result === 'true') {
          this.loader.start();
          this.herosService.handleDeleteRequest(heroId).then(() => {
            this.loader.stop();
            this.modalDialog.closeAll();
          });
        }
      });
  }

  handleSubmit(event: Event) {
    //Para que no recarge la pagina
    event.preventDefault();
    if (this.heroForm.valid) {
      this.loader.start();
      this.herosService
        .handleEdit(this.getHeroFromForm())
        .then(() => {
          //TODO Poner loading
          this.modalDialog.closeAll();
          this.loader.stop();
        })
        .catch((error) => {
          this.modalDialog.closeAll();
          this.loader.stop();
        });
    }
  }

  //TODO metodo para pasar de array a string

  getHeroFromForm(): Hero {
    const heroValueFromForm = this.heroForm.getRawValue();
    const editedHero: Hero = {
      ...this.heroData!,
      biography: {
        ...this.heroData!.biography,
        realName:
          heroValueFromForm.realName || this.heroData!.biography.realName,
        aliases: this.arrayFromTextArea(
          heroValueFromForm.aliases || this.heroData!.biography.aliases
        ),
        firstAppareance:
          heroValueFromForm.firstAppareance ||
          this.heroData!.biography.firstAppareance,
        placeOfBirth:
          heroValueFromForm.placeOfBirth ||
          this.heroData!.biography.placeOfBirth,
      },
      appearance: {
        ...this.heroData!.appearance,
        eyeColor:
          heroValueFromForm.eyeColor || this.heroData!.appearance.eyeColor,
        gender: heroValueFromForm.gender || this.heroData!.appearance.gender,
        race: heroValueFromForm.race || this.heroData!.appearance.race,
        height: heroValueFromForm.height || this.heroData!.appearance.height,
        weight: heroValueFromForm.weight || this.heroData!.appearance.weight,
      },
      work: {
        ...this.heroData!.work,
        occupation:
          heroValueFromForm.occupation || this.heroData!.work.occupation,
      },
    };
    return editedHero;
  }

  arrayFromTextArea(textAreaValue: string) {
    try {
      const textAreaArray: string[] = textAreaValue.trim().split(/[,\s]+/);
      const aliasFromTextArea = textAreaArray.filter((alia) => alia !== '');
      return aliasFromTextArea;      
    } catch (error) {
      return [textAreaValue];
    }
  }
}
