import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { Hero } from 'src/models/Hero';
import { HerosService } from 'src/services/herosService/heros.service';
import { StorageService } from 'src/services/storageService/storage.service';
import {v4 as uuidv4} from 'uuid';
@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
  standalone: true,
  imports: [MatDialogModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class HeroFormComponent {
  heroImageStorageUrl: string | undefined;
  heroImageFile: File | undefined;
  newHeroForm: FormGroup;
  haveImage: boolean = false;
  constructor(
    private herosService: HerosService,
    public formBuild: FormBuilder,
    private storageService: StorageService
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
      if (this.haveImage && this.heroImageFile) {
        const newHero: Hero = this.getHeroFromForm();
        this.createHeroWithImage(this.newHeroForm.getRawValue().name, newHero);
      } else {
        const newHero: Hero = this.getHeroFromForm();
        await this.herosService.createHero(newHero);
      }
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
        aliases: heroValueFromForm.aliases,
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
}
