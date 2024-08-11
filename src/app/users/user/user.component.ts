import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/user.model';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  allUser!:User[];
  constructor(private userService:UserService){ }

  ngOnInit(): void {
  
    this.userService.getLoggedUser().subscribe(
      (res)=>{
        console.log(res)
      },
      (err)=>{
        alert("veuillez connecter!!!")
      }
    )
    this.userService.getAllUsers().subscribe(
      (res)=>{
        this.allUser=res;
        console.log(this.allUser)
      },
      (err)=>{
        console.error("erreur = ",err)
      }
    )
  }
}
