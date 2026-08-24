import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {apiUrl} from '../../config/api-url';
import {ThemeService} from '../../service/theme.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  login=new FormGroup({
    email:new FormControl(),
    password:new FormControl(),
  });

  http=inject(HttpClient);
  router=inject(Router);
  theme=inject(ThemeService);

  onSubmit(){
    this.http.post(apiUrl('/api/employees/login'), this.login.value).subscribe({
      next:(result:any)=>{
        this.router.navigateByUrl("/dashboard");
        localStorage.setItem("empLoginUser",JSON.stringify(result.data));
      },
      error:(err:any)=>{
        const status = err?.status;
        const message =
          err?.error?.message ||
          (status === 401 ? 'Invalid email or password.' : null) ||
          (status === 0 ? 'No response from the API. Restart ng serve after changing proxy.json.' : null) ||
          err?.message ||
          'Login failed.';
        alert(message);
      }
    });
  }

}
