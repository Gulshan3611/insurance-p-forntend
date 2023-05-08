import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService, AuthService, updateHeaderService } from "../../../_services";
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: any = {}
  loading: boolean = false;
  showError: boolean = false;
  submitted: boolean = false;
  mediaUrl = environment.apiUrl;

  myForm: any = {};
  public passwordTextTypeOld = false;
  public passwordTextTypeNew = false;
  public passwordTextTypeRetype = false;

  constructor(
    private _toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _adminService:AdminService,
    private _header: updateHeaderService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.profile = this._authService.getAdminData();
    // if (this.profile && this.profile.image) {
    //   this.profile.image = this.mediaUrl + '/media/preview?filename=' + this.profile.image;
    // }
  }

  handleFileSelect(evt: any) {
    var files = evt.target.files;
    if (files.length === 0)
      return;
    const fsize = files[0].size;
    const file = Math.round((fsize / 1024 / 1024));
    var mimeType = files[0].type;
    console.log('call size====', fsize, file, mimeType)
    // if (!(file <= 100)) {
    //   return this._toastrService.warning("File too Big, please select a file less than 100mb")
    // }
    
    if (mimeType.match(/image\/*/) == null) {
      this._toastrService.info("Only images are supported.");
      return;
    }
    var reader = new FileReader();
    this.profile.file = files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.profile.image = reader.result;
    }

  }

  // Profile 
  onSubmit(valid: any) {
    this.showError = true;
    this.submitted = true;
    console.log("this.showError",this.showError);
    
    console.log('checking---', valid, this.profile)
    if (valid) {
      this.loading = true;
      this.spinner.show();
      // call api
      this.profile.email = this.profile.email.toLocaleLowerCase();
      const formdata = new FormData();
      if (this.profile.file) {
        formdata.append('profilePhoto', this.profile.file);
      }
      
      formdata.append('name', this.profile.name.replace( /\s\s+/g, ' ' ));
      formdata.append('email', this.profile.email);
      formdata.append('phone', this.profile.phone);
      let id = this.profile.id

      this._adminService.updateUserInfo(id,formdata).subscribe(objS => {
        console.log('print response====', objS)
        this.loading = this.showError = false;
        if (objS.code == 200) {
          this._authService.setDataAdmin(objS.data);
          this.spinner.hide();
          this.router.navigate(['/setting/profile']);
          this._toastrService.success(objS.message);
          this._header.checkFunction(true);
        } else if (objS.code == 401) {
          this._toastrService.error(objS.message);
          this._authService.adminLogout();
          this.router.navigate(['/auth/login']);
        }  else {
          this._toastrService.error(objS.message);
          this.spinner.hide();
        }
      }, (err) => {
        this.loading = this.showError = false;
        console.log('err', err)
      });
   
    }
  }

  onChangePassword(valid: any) {
    if (valid) {
      this.loading = true;
      if (this.myForm.oldPassword === this.myForm.password) {
        this.loading = false;
        // this._toastrService.error('New password should not be same as old password.')
      } else if (this.myForm.password === this.myForm.confirmPassword) {
        console.log('check req====', this.myForm)
        // this._expertService
        //   .changePassword(this.myForm).subscribe(res => {
        //     if (res.code == 200) {
        //       this.loading = false;
        //       this.myForm = {}
        //       // this.router.navigate(['/home']);
        //       // this._toastrService.success(res.message);
        //     } else {
        //       // this._toastrService.error(res.message);
        //       this.loading = false;
        //     }
        //   }, (err) => {
        //     console.log(err);
        //   })
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