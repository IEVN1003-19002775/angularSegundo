import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './zodiaco.component.html',
  styles: []
})
export class ZodiacoComponent implements OnInit {
  formulario!: FormGroup;
  resultado: any = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apaterno: ['', Validators.required],
      amaterno: ['', Validators.required],
      dia: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      mes: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      anio: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      sexo: ['', Validators.required]
    });
  }

  datos() {
    if (this.formulario.valid) {
      const { nombre, apaterno, amaterno, dia, mes, anio, sexo } = this.formulario.value;
      const edad = this.Edad(anio);
      const animal = this.animalChino(anio);
      const imagenSigno = this.animalImagen(animal);

      this.resultado = {
        nombre,
        apaterno,
        amaterno,
        edad,
        animal,
        imagenSigno
      };
    }
  }

  Edad(anio: number): number {
    const fechaActual = new Date();
    return fechaActual.getFullYear() - anio;
  }

  animalChino(anio: number): string {
    const animales = ['Rata', 'Buey', 'Tigre', 'Conejo', 'Dragón', 'Serpiente', 'Caballo', 'Cabra', 'Mono', 'Gallo', 'Perro', 'Cerdo'];
    return animales[(anio - 4) % 12];
  }

  animalImagen(animal: string): string {
    const imagenes: any = {
      'Rata': 'https://static.wikia.nocookie.net/disney/images/7/70/Remy.png/revision/latest?cb=20130307114718&path-prefix=es',
      'Buey': 'https://preview.redd.it/c4euksx455r41.jpg?width=640&crop=smart&auto=webp&s=cedd1a141f810474825e901aff2d1fc6d6256851',
      'Dragón': 'https://cdn.mos.cms.futurecdn.net/tHZeuWbbNQxVPnyozGrwnF-1200-80.jpg',
      'Serpiente': 'https://i.pinimg.com/736x/0f/c4/bf/0fc4bfa9d800ca9e6af0d21e0d3f9fe7.jpg',
      'Caballo': 'https://preview.redd.it/ucv34e0c4q061.png?width=640&crop=smart&auto=webp&s=d7205528f9553dba539db7ac8c30dbbd6efcdb6b',
      'Cabra': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFxqLDsbtwl4gs51ZoArJy1iDKkNS8yoQbrw&s',
      'Mono': 'https://us-tuna-sounds-images.voicemod.net/d447707d-82eb-4382-adf6-9fed5fe21221-1678210318422.jpg',
      'Gallo': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXPJHqEhgXLPW8xwt1wirEg19vRtbUAiRHRg&s',
      'Perro': 'https://i.pinimg.com/474x/85/a9/3e/85a93e8011357b4b3620383d9bfa7cbd.jpg',
      'Cerdo': 'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/13FD/production/_99171150_peppapigpa.jpg.webp'
    };

    return imagenes[animal] || '';
  }
}

