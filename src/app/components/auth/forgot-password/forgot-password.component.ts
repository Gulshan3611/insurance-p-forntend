import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService, AuthService } from "../../../_services";
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  
  myForm: any = {};
  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _toastr: ToastrService,
    private _adminAuthAPI: AdminService,
    private _authService: AuthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  navLogin(){
    this._router.navigate(['/auth/login']);
  }

  onSubmit(invalid: any): void {
    this.showError = true;
    if (invalid) return;
    if (this.loading) true;
    this.loading = true;
    this.spinner.show()
    // call api

    this._adminAuthAPI.forgotPassword({email:this.myForm.email}).subscribe(objS => {
      // console.log('print response====', objS)
      this.loading = this.showError = false;
      if (objS.code == 200) {
        this._toastr.success(objS.message)
        // navigate to dashboard
        this._router.navigate(['/auth/login']);
        this.spinner.hide()
      }
      else {
        this.apiCalled = false
        this.loading = false
        this._toastr.error(objS.message)
        this.spinner.hide()
      }
    }, err => {
      this._toastr.error(err?.error?.message)
    });
  }
}


