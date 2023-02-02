import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService, AuthService, updateHeaderService } from "../../../_services";
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {
  
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
    var reader = new FileReader();
    this.profile.file = files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.profile.image = reader.result;
    }

  }

  handleFileSelectIcon(evt: any) {
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
    var reader = new FileReader();
    this.profile.file = files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.profile.icon = reader.result;
    }
  }

  // Company 
  onSubmit(valid: any) {
    this.showError = true;
    this.submitted = true;
    // console.log('checking---', valid, this.profile)
    if (valid) {
      this.loading = true;
      this.spinner.show();
      // call api
      this.profile.email = this.profile.email.toLocaleLowerCase();
      const formdata = new FormData();
      if (this.profile.file) {
        formdata.append('image', this.profile.file);
      }
      
      formdata.append('name', this.profile.name.replace( /\s\s+/g, ' ' ));
      formdata.append('email', this.profile.email);
      formdata.append('phone', this.profile.phone);

      // this._adminService.updateExpert(formdata).subscribe(objS => {
      //   console.log('print response====', objS)
      //   this.loading = this.showError = false;
      //   if (objS.code == 200) {
      //     this._authService.setDataAdmin(objS.data);
      //     this.spinner.hide();
      //     this.router.navigate(['/review/list']);
      //     this._toastrService.success(objS.message);
      //     this._header.checkFunction(true);
      //   } else {
      //     this._toastrService.error(objS.message);
      //     this.spinner.hide();
      //   }
      // }, (err) => {
      //   this.loading = this.showError = false;
      //   console.log('err', err)
      // });
   
    }
  } 
}
