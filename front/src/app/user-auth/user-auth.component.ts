import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TLogin, TSignUp } from '../data-type';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss'],
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true
  authError: string = "";
  rolesItems: string[] = ["Guerrier", "Alchimiste", "Sorcier", "Espions", "Enchanteur"];
  constructor(private userservice: UserService, private route: Router) {

  }

  ngOnInit(): void {
    this.userservice.userAuthReload();
  }


  async signUp(data: TSignUp) {
    console.log(data, "data");
    (await this.userservice.userSignUp(data)).subscribe({
      next: () => {
        this.authError ='Votre compte a bien été créé. vous allez être redirigé sur le formulaire de connexion';
        this.route.navigateByUrl('fantomes');
      },
      error: (err) => {
        // error 
        alert('Une erreur est survenue');
        this.authError ='Une erreur est survenue';
        this.userservice.invalidUserAuth;
      }
    });

    this.userservice.invalidUserAuth;
  }

  login(data: TLogin) {
    this.userservice.userLogin(data).subscribe({
      next: () => {
        this.route.navigateByUrl('fantomes');
      },
      error: (err) => {
        alert('Mot de passe ou email incorrecte');
        this.userservice.invalidUserAuth;
      }
    });
  }


  openSignUp() {
    this.showLogin = false
  }
  openLogin() {
    this.showLogin = true;
  }
}
