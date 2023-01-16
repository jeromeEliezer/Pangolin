import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  menuType: string = 'default';
  rolesName:string="";
  userName:string="";
  constructor(private route: Router) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('roles') && val.url.includes('roles')) {
         let rolesStore=localStorage.getItem('roles');
         let rolesData =rolesStore && JSON.parse(rolesStore)[0];
         this.rolesName=rolesData.name;
          this.menuType = 'roles';
        }
        else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName= userData.name;
          this.menuType='user';
        }
         else {
          this.menuType = 'default';
        }
      }
    });
   
  }
  logout(){
    localStorage.removeItem('roles');
    this.route.navigate(['/'])
  }

  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
