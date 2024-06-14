import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {
  Messages,
  Salon,
  Serveur,
  Utilisateur,
} from '../../models/serveur.type';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterLink,
    MatTooltipModule,
    MatButtonModule,
    MatListModule,
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss',
})
export class PrincipalComponent implements OnInit {
  formBuilder: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  listeServeur: Serveur[] = [];
  listeSalon: Salon[] = [];
  serveurSelectionne: Serveur | null = null;
  listeMessage: Messages[] = [];
  salonSelectionne: Salon | null = null;
  utilisateurId: string = '';
  listeParticipants: Utilisateur[] = [];
  emailDuCreateur: string = '';
  snackBar: MatSnackBar = inject(MatSnackBar);

  formulaire: FormGroup = this.formBuilder.group({
    contenu: ['', [Validators.minLength(1), Validators.maxLength(1000)]],
  });

  ngOnInit() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      const decodedToken: any = jwtDecode(jwt);

      this.utilisateurId = decodedToken.sub;

      this.http
        .get<Serveur[]>('http://localhost:3000/serveur/possede')
        .subscribe((listeServeur) => {
          this.listeServeur = listeServeur;
          if (listeServeur.length > 0) {
            this.selectServeur(listeServeur[0]);
          }
        });
    }
  }

  selectServeur(serveur: Serveur) {
    this.serveurSelectionne = serveur;
    this.emailDuCreateur = serveur.createur;
    this.http
      .get<Salon[]>(`http://localhost:3000/salon/par-serveur/${serveur._id}`)
      .subscribe((listeSalon) => (this.listeSalon = listeSalon));

    this.http
      .get<Utilisateur[]>(
        `http://localhost:3000/serveur/participants/${serveur._id}`
      )
      .subscribe(
        (listeParticipants) => (this.listeParticipants = listeParticipants)
      );
  }

  selectSalon(salon: Salon) {
    console.log('selectSalon:', salon);

    this.salonSelectionne = salon;
    console.log('this.salonSelectionne:', this.salonSelectionne);

    this.http
      .get<Messages[]>(`http://localhost:3000/message/par-salon/${salon._id}`)
      .subscribe((listeMessage) => (this.listeMessage = listeMessage));
  }

  envoyerMessage() {
    if (this.formulaire.valid && this.salonSelectionne) {
      const message = {
        contenu: this.formulaire.value.contenu,
        utilisateur: this.utilisateurId,
        salon: this.salonSelectionne._id,
      };
      this.http
        .post<Messages>('http://localhost:3000/message', message)
        .subscribe((newMessage) => {
          this.listeMessage.push(newMessage);
          this.formulaire.reset();
        });
    }
  }

  banParticipant(participant: Utilisateur) {
    if (
      this.serveurSelectionne &&
      confirm(`Voulez-vous vraiment bannir ${participant.email} ?`)
    ) {
      this.http
        .delete(
          `http://localhost:3000/serveur/${this.serveurSelectionne._id}/ban/${participant._id}`
        )
        .subscribe(() => {
          this.listeParticipants = this.listeParticipants.filter(
            (participant) => participant._id !== participant._id
          );

          window.location.reload();

          this.snackBar.open(`${participant.email} a été banni`, 'Fermer', {
            duration: 3000,
          });
        });
    }
  }
}
