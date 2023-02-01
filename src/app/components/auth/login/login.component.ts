import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService, AuthService } from "../../../_services";
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myForm: any = {};
  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;
  public passwordTextType = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _toastr: ToastrService,
    private _adminAuthAPI: AdminService,
    private _authService: AuthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    if (this._authService.isLoggedInAdmin()) {
      // navigate to dashboard
      this._router.navigate(['/dashboard']);
    }
  } 

  onSubmit(invalid: any): void {
    // this.router.navigate(['/login']);
    // return;
    this.showError = true;
    if (invalid) return;
    if (this.loading) true;
    this.loading = true;
    this.spinner.show()
    // call api

    // this._adminAuthAPI.login(this.myForm).subscribe(objS => {
    //   this.loading = this.showError = false;
    //   if (objS.code == 200) {
    //     this._authService.setDataAdmin(objS.data.admin);
    //     this._authService.setTokenAdmin(JSON.stringify(objS.data.tokens));
    //     if (objS.data.admin.type == 'superadmin') {
    //       localStorage.setItem('userType', 'Admin')
    //       this._router.navigate(['/dashboard']);
    //     } else {
    //       localStorage.setItem('userType', 'Expert')
    //       this._router.navigate(['/review/list']);
    //     }
    //     this._toastr.success(objS.message)
    //     // navigate to dashboard
    //   }
    //   else {
    //     this.apiCalled = false
    //     this.loading = false
    //     this._toastr.error(objS.message)
    //   }

    // }, err => {
    //   this._toastr.error(err?.error?.message)
    // });
  }

   /**
 * Toggle Password Text Type 
 */
    togglePasswordTextType() {
      this.passwordTextType = !this.passwordTextType;
    }
}
