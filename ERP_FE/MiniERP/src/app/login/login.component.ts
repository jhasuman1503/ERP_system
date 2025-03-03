import { Component, NgModule, OnInit } from '@angular/core';
import { UserService} from "./../Services/user.service"
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Userlogin } from '../models/userlogin';
import { CommonModule, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent   {
  loginError:boolean = false;

  /**
   *
   */
  constructor(private UserService: UserService) {

    
  }

  userloginFormGroup = new FormGroup({
    username : new FormControl("",[Validators.minLength(3),Validators.required]),
    password : new FormControl("",[Validators.min(3),Validators.required])
  })

  UserLogin(){
    
    let Userinfo : Userlogin =
    {
      username : this.userloginFormGroup.get('username')?.value as string,
      password : this.userloginFormGroup.controls.password?.value as string
    }
console.log("hello");
if(this.userloginFormGroup.valid)
   {   this.UserService.UserloginRequest(Userinfo).subscribe(
        (response:any) => {
          this.loginError =false;
          console.log(response);

          if(response.token)
          {
            localStorage.setItem('token',response.token);
          }
          if(response.role == 'Admin')
          {
            window.location.href = '/admin';
          }else if(response.role == 'Purchase')
          {
            window.location.href = '/purchase';
            
          }

          else{
            window.location.href = '/sales';
          }
        },
      (error) => {
        this.loginError =true;

        console.log(error);
      }
    )
}else{
  alert("Please enter valid username and password");
}
  }
  

}
