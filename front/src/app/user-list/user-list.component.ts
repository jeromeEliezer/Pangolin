import { Component, OnInit } from '@angular/core';
import { TUser } from '../data-type';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users!: TUser[];
  keys!: string[];
  constructor(private userservice: UserService) {
  }
  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.userservice.getUsers().subscribe(users => {
      this.users = users
      if(users.length>0) this.keys = Object.keys(users[0])
    });
  }

  addFriend(_id:any) {
    console.log(_id,"id")
     
  }
  
}
