import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Hero } from 'src/models/Hero';
import { HerosService } from 'src/services/herosService/heros.service';
import { v4 as uuidv4 } from 'uuid';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
})
export class HeroFormComponent {
  heroImageStorageUrl: string | undefined;
  heroImageFile: File | undefined;
  newHeroForm: FormGroup;
  haveImage: boolean = false;
  loading: boolean = false;

  constructor(
    private herosService: HerosService,
    public formBuild: FormBuilder,
    private loader: NgxUiLoaderService,
    public modalDialog: MatDialog
  ) {
    this.newHeroForm = this.formBuild.group({
      realName: ['', Validators.required],
      aliases: ['', Validators.required],
      placeOfBirth: ['', Validators.required],
      firstAppareance: ['', Validators.required],
      occupation: ['', Validators.required],
      eyeColor: ['', Validators.required],
      gender: ['', Validators.required],
      race: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  async handleCreateNewHero(event: any) {
    event.preventDefault();
    if (this.newHeroForm.valid) {
      this.loader.start();
      this.loading = true;
      if (this.haveImage && this.heroImageFile) {
        const newHero: Hero = this.getHeroFromForm();
        this.createHeroWithImage(this.newHeroForm.getRawValue().name, newHero);
      } else {
        const newHero: Hero = this.getHeroFromForm();
        await this.herosService.createHero(newHero);
      }
      this.modalDialog.closeAll();
      this.loader.stop();
    }
  }

  getHeroFromForm(): Hero {
    const heroValueFromForm = this.newHeroForm.getRawValue();
    const newHero: Hero = {
      name: heroValueFromForm.name,
      //TODO Ver como poner el id
      id: uuidv4(),
      biography: {
        realName: heroValueFromForm.realName,
        aliases: this.arrayFromTextArea(heroValueFromForm.aliases),
        placeOfBirth: heroValueFromForm.placeOfBirth,
        firstAppareance: heroValueFromForm.firstAppareance,
      },
      appearance: {
        eyeColor: heroValueFromForm.eyeColor,
        gender: heroValueFromForm.gender,
        race: heroValueFromForm.race,
        height: heroValueFromForm.height,
        weight: heroValueFromForm.weight,
      },
      work: {
        occupation: heroValueFromForm.occupation,
      },
      image: {
        url: '',
      },
    };
    return newHero;
  }

  createHeroWithImage(imageName: string, newHero: Hero) {
    const fileReader = new FileReader();

    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      const blob = new Blob([e.target!.result!], {
        type: this.heroImageFile!.type,
      });
      this.herosService.handleCreateHeroWithImage(blob, imageName, newHero);
    };
    fileReader.readAsArrayBuffer(this.heroImageFile!);
  }

  handleImage(event: any) {
    this.haveImage = true;
    this.heroImageFile = event.target.files[0];
  }

  arrayFromTextArea(textAreaValue: string) {
    const textAreaArray: string[] = textAreaValue.trim().split(/[,\s]+/);
    const aliasFromTextArea = textAreaArray.filter((alia) => alia !== '');
    return aliasFromTextArea;
  }
}
