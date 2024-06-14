import { Routes } from '@angular/router';
import { ConnexionComponent } from './ecrans/connexion/connexion.component';
import { Page404Component } from './ecrans/page404/page404.component';
import { ProfilComponent } from './ecrans/profil/profil.component';
import { PrincipalComponent } from './ecrans/principal/principal.component';
import { EditionServeurComponent } from './ecrans/edition-serveur/edition-serveur.component';
import { InscriptionComponent } from './ecrans/inscription/inscription.component';
import { userGuard } from './guards/user.guard';
import { EditionSalonComponent } from './ecrans/edition-salon/edition-salon.component';

export const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'profil', component: ProfilComponent, canActivate: [userGuard] },
  {
    path: 'principal',
    component: PrincipalComponent,
    canActivate: [userGuard],
  },
  {
    path: 'ajout-serveur',
    component: EditionServeurComponent,
    canActivate: [userGuard],
  },
  {
    path: 'ajout-salon/:serveurId',
    component: EditionSalonComponent,
    canActivate: [userGuard],
  },
  { path: '', redirectTo: 'principal', pathMatch: 'full' },
  { path: '**', component: Page404Component },
];
