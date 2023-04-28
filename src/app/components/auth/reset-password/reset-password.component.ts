import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService, AuthService } from "../../../_services";
import { ConfirmPasswordValidator } from './confirm-password-validator';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: any = {};
  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;
  submitted = false;
  token: any;

  public passwordTextType: boolean = false;
  public confPasswordTextType: boolean = false;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _toastr: ToastrService,
    private _adminAuthAPI: AdminService,
    private _authService: AuthService,
    private formbulider: FormBuilder,
    private spinner:NgxSpinnerService
  ) {
    this._route.queryParams.subscribe((res: any) => {
      console.log(res.token)
      this.token = res.token
    })
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  /**
   * Toggle confirm password
   */
  toggleConfPasswordTextType() {
    this.confPasswordTextType = !this.confPasswordTextType;
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._authService.adminLogout();
    // if (this._authService.isLoggedInAdmin()) {
    //   // navigate to dashboard
    //   this._router.navigate(['/dashboard']);
    // }
    this.resetForm = this.formbulider.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
      confirmPassword: ['', [Validators.required]]
    },
      {
        validator: ConfirmPasswordValidator('password', 'confirmPassword')
      }
    )
  }

  get f() {
    return this.resetForm.controls
  }

  changePassword() {
    this.loading = true;
    if (this.resetForm.invalid) {
      return
    } else {
      const data = {
        password: this.resetForm.value.password,
      }
      this.spinner.show()
      this._adminAuthAPI.resetPassword(this.token, data).subscribe((res: any) => {
        if (res.code == 200) {
          this._toastr.success(res.message)
          this._router.navigate(['/dashboard']);
        } else {
          this._toastr.error(res.message)
        }
      })
    }
  }
}
