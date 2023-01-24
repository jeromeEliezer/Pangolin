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
    (await this.userservice.userSignUp(data)).subscribe((res: any) => {
      if (res.status === 201)
        this.route.navigateByUrl('/fantomes');
      console.log(res);
    });
    this.userservice.invalidUserAuth;
  }
  login(data: TLogin) {
    this.userservice.userLogin(data).subscribe(
      () => {
        this.route.navigateByUrl('fantomes');
      },
      err => {
        alert('erreur de connexion')
      }
    );
    this.userservice.invalidUserAuth;
  }
  
  openSignUp() {
    this.showLogin = false
  }
  openLogin() {
    this.showLogin = true;
  }
}
