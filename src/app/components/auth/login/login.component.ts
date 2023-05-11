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
      this._router.navigate(['/role-management/list']);
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

    this._adminAuthAPI.login(this.myForm).subscribe(objS => {
      // console.log('print response====', objS)
      this.loading = this.showError = false;
      if (objS.code == 200) {
        // store login session in browser
        this._authService.setDataAdmin(objS.data.admin);
        this._authService.setTokenAdmin(JSON.stringify(objS.data.tokens));
        if (objS.data.admin.type == 'superadmin') {
          this.spinner.hide()
          localStorage.setItem('userType', 'Admin')
          this._router.navigate(['/role-management/list']);
          // this._router.navigate(['/dashboard']);
        } else {
          this.spinner.hide()
          localStorage.setItem('userType', 'Expert');
          var data = this._authService.getAdminData().role;
          var loginDetails = this._authService.getAdminData();
          if (data && loginDetails.type != 'superadmin') {
            for (let i = 0; i < data.resource.length; i++) {
              if (data.resource[i].moduleId) {
                data.resource[i].permissions ? true : false
                // console.log('data-----===>>122==', data.resource[i].moduleId, data.resource[i].permissions)

                if( data.resource[i].moduleId == 1 && (data.resource[i].permissions[0] == 'selectedAll' || data.resource[i].permissions[0] == 'list')) {
                  console.log('1')
                  return this._router.navigate(['/role-management/list']);
                }
                else if( data.resource[i].moduleId == 2 && (data.resource[i].permissions[0] == 'selectedAll' || data.resource[i].permissions[0] == 'list')) {
                  return this._router.navigate(['/staff-management/list']);
                }
                else if( data.resource[i].moduleId == 3 && (data.resource[i].permissions[0] == 'selectedAll' || data.resource[i].permissions[0] == 'list')) {
                  return this._router.navigate(['/vendor-management/list']);
                }
                else if( data.resource[i].moduleId == 4 && (data.resource[i].permissions[0] == 'selectedAll' || data.resource[i].permissions[0] == 'list')) {
                  return this._router.navigate(['/project-management/list']);
                }
                else if( data.resource[i].moduleId == 5 && (data.resource[i].permissions[0] == 'selectedAll' || data.resource[i].permissions[0] == 'list')) {
                  return this._router.navigate(['/invoice-management/list']);
                }
                else if( data.resource[i].moduleId == 6 && (data.resource[i].permissions[0] == 'selectedAll' || data.resource[i].permissions[0] == 'list')) {
                  return this._router.navigate(['/gst/list']);
                }
                else if( data.resource[i].moduleId == 7 && (data.resource[i].permissions[0] == 'selectedAll' || data.resource[i].permissions[0] == 'list')) {
                  return this._router.navigate(['/resource-management/list']);
                }
                else {
                  this._router.navigate(['/no-permission']);
                }
              }
            }
          } else {
            return true;
          }
        }
        this.spinner.hide()
        this._toastr.success(objS.message)
        // navigate to dashboard
      }
      else {
        this.apiCalled = false
        this.loading = false
        this.spinner.hide()
        this._toastr.error(objS.message)
      }

    }, err => {
      this._toastr.error(err?.error?.message)
    });
  }
   /**
 * Toggle Password Text Type 
 */
    togglePasswordTextType() {
      this.passwordTextType = !this.passwordTextType;
    }
}