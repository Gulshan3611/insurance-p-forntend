import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService, AuthService} from "../../../_services";
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
 
  loading: boolean = false;
  showError: boolean = false;
  submitted: boolean = false;

  myForm: any = {};
  public passwordTextTypeOld = false;
  public passwordTextTypeNew = false;
  public passwordTextTypeRetype = false;

  constructor(
    private _toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _adminService: AdminService,
    private _authService: AuthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  onChangePassword(valid: any) {
    if (valid) {
      this.loading = true;
      if (this.myForm.oldPassword === this.myForm.password) {
        this.loading = false;
        // this._toastrService.error('New password should not be same as old password.')
      } else if (this.myForm.password === this.myForm.confirmPassword) {
        console.log('check req====', this.myForm)
        this._adminService
          .changePassword(this.myForm).subscribe(res => {
            if (res.code == 200) {
              this.loading = false;
              this.myForm = {}
              this._authService.adminLogout();
              this.router.navigate(['/auth/login']);
              this._toastrService.success(res.message);
            } else {
              this._toastrService.error(res.message);
              this.loading = false;
            }
          }, (err) => {
            console.log(err);
          })
      } else {
        // this._toastrService.error('Confirm password should be same as new password');
      }
    }
  }

  /**
 * Toggle Password Text Type Old
 */
  togglePasswordTextTypeOld() {
    this.passwordTextTypeOld = !this.passwordTextTypeOld;
  }

  /**
   * Toggle Password Text Type New
   */
  togglePasswordTextTypeNew() {
    this.passwordTextTypeNew = !this.passwordTextTypeNew;
  }

  /**
   * Toggle Password Text Type Retype
   */
  togglePasswordTextTypeRetype() {
    this.passwordTextTypeRetype = !this.passwordTextTypeRetype;
  }
}