import { Component, ViewChild, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edition-salon',
  standalone: true,
  imports: [
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterLink,
  ],
  templateUrl: './edition-salon.component.html',
  styleUrl: './edition-salon.component.scss',
})
export class EditionSalonComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  snackBar: MatSnackBar = inject(MatSnackBar);

  dataSource: any;
  serveurId: string | null = null;

  formulaire: FormGroup = this.formBuilder.group({
    nom: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
  });

  ngOnInit() {
    this.serveurId = this.route.snapshot.paramMap.get('serveurId');
  }

  onAjoutSalon() {
    if (this.formulaire.valid && this.serveurId) {
      const dataSalon = {
        ...this.formulaire.value,
        serveur: this.serveurId,
      };

      this.http
        .post('http://localhost:3000/salon', dataSalon)
        .subscribe((nouveauSalon) => {
          this.snackBar.open('Le salon a bien été ajouté', undefined, {
            duration: 3000,
          });

          this.router.navigateByUrl('/principal');
        });
    }
  }
}
