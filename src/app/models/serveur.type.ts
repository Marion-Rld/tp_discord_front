export declare type Serveur = {
  _id: string;
  nom: string;
  description: string;
  urlLogo: string;
  public: boolean;
  createur: string;
  particpants: string[];
};

export declare type Salon = {
  _id: string;
  nom: string;
  messages: Messages[];
};

export declare type Messages = {
  _id: string;
  contenu: string;
  utilisateur: Utilisateur;
  createdAt: Date;
};

export declare type Utilisateur = {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  urlAvatar: string;
};
