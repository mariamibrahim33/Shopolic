import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule,RouterLink ,RouterLinkActive , FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private router: Router) {}



   navigateToHome() {
    this.router.navigate(['/']);} 

  postData(form:NgForm){
    console.log(form);
    if(form.valid){
      console.log('valid')
    } else{
      console.log('invalid')
    }
    
  };

  changes(form:NgForm){

    form.form.patchValue({username:'Mariam'})
    console.log(form.value)
    
  }
  


}


