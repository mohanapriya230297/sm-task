import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from 'rxjs/operators';
import { UserAuthService } from './../../services/user-auth.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  @Input('showSpinner') showSpinner: string;

  signupForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    private userService: UserService,
    public authService: UserAuthService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  menu: Array<any> = [
    { txt: 'Sign in', rout: '/signin' },
  ];

  ngOnInit() {

    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      mobile: ['', Validators.required],
      pan: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.signupForm.controls; }

  userLogin() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.signUp(this.signupForm.value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          alert('Registration successfull')
          this.router.navigate(['/signIn'], { queryParams: { registered: true } });
        },
        error => {
          this.loading = false;
        });
  }
}

