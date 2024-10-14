import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  
  loginFormGroup!:FormGroup;
  session:Storage=sessionStorage;
  errorMsg: string='';

  constructor(private formBuilder:FormBuilder,
              private router:Router 
  ){}

  ngOnInit(): void {
   this.loginFormGroup=this.formBuilder.group({
    login:this.formBuilder.group({
      email:[''],
      pwd:['']
    })
   })
  }

  get email(){
    return this.loginFormGroup.get('login.email');
  }
  get pwd(){
    return this.loginFormGroup.get('login.pwd')
  }

  onSubmit(){
    if(this.email?.value === "nani@gmail.com"){
      this.session.setItem('customerEmail',this.email?.value);
      

      this.router.navigateByUrl("/orders")
      
    }else{
      this.errorMsg="Invalid Credentials";
    }
  }

}

    