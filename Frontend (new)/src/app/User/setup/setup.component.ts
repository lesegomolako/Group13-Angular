import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { from } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ReportingService } from '../../API Services/for User/reporting.service';
import {Process} from '../../API Services/for User/process';
import { HttpClient } from '@angular/common/http';

export class UserData
{
  Username: string;
  Password: string;
  SessionID: string;
}

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.sass']
})
export class SetupComponent implements OnInit {
  setupForm: FormGroup;
  submitted = false;
  public SetupFormGroup: FormGroup;
  user: UserData;
  SessionID: any;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    public service: ReportingService,
    private ActRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ValidSession;

  ngOnInit(){

    this.ValidSession = this.service.ValidSession(sessionStorage.getItem("SessionID"))

    if(this.ValidSession == true)
    {

    this.setupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', [Validators.required, Validators.minLength(6)]],
    });

    
      this.SessionID = this.ActRoute.snapshot.queryParams['SessionID']
      console.log(this.SessionID);     
    }
    else
    {
      alert("Session is no longer valid. Redirecting to homepage")
      this.router.navigateByUrl("/home")
    }
  }
  get f() {
    return this.setupForm.controls;
  }

  checkPasswords(group:FormGroup){
    let pw = group.get('password').value;
    let confirmpw = group.get('cpassword').value;

    return pw == confirmpw ? null : {notSame: true}
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.SetupFormGroup.controls[controlName].hasError(errorName);
  };
  onReset() {
    this.submitted = false;
    this.setupForm.reset();
  }
//18-25, 8
  omit_special_char(event) {
    var k;
    k = event.charCode;
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    );
  }

  onSubmit(){
    this.submitted = true;

    if(this.setupForm.invalid){
      return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.setupForm.value));
  }
  //user: User;
  setupUser(){
    
    this.user = this.setupForm.value;
    this.user.Password = this.setupForm.value.password;
    this.user.SessionID = this.SessionID;
    this.service.userSetup(this.user).subscribe((res: any) => {
        if(res.Message)
        {
          alert("User successfully set up. Redirecting to homepage")
          this.router.navigateByUrl("/clienthome")
        }
        else if(res.Error)
        {

        }
    })
//loser
  }
  loadList() {
    throw new Error("Method not implemented.");
  } 
 
}
