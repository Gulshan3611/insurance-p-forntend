import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService, AuthService, updateHeaderService } from "../../../_services";
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrls: ['./bank-detail.component.scss']
})
export class BankDetailComponent implements OnInit {
  
  bank: any = {}
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
    this._adminService.getBankDetails("642eadd807090c079ea0de99").subscribe(objS => {
      console.log('print response====', objS)
      this.loading = this.showError = false;
      if (objS.code == 200) {
        this.bank = objS.data
      } else {
        this._toastrService.error(objS.message);
      }
    }, (err) => {
      this.loading = this.showError = false;
      console.log('err', err)
    });
    // this.bank = this._adminService.getBankDetails("642eadd807090c079ea0de99");
    // console.log(this.bank);
    
    // if (this.profile && this.profile.image) {
    //   this.profile.image = this.mediaUrl + '/media/preview?filename=' + this.profile.image;
    // }
  }


  // bank 
  onSubmit(valid: any) {
    this.showError = true;
    this.submitted = true;
    // console.log('checking---', valid, this.profile)
    if (valid) {
      this.loading = true;
      this.spinner.show();
      // call api
      
      this._adminService.updateBankDetails(this.bank).subscribe(objS => {
        console.log('print response====', objS)
        this.loading = this.showError = false;
        if (objS.code == 200) {
          this._authService.setDataAdmin(objS.data);
          this.spinner.hide();
          this.router.navigate(['/setting/profile']);
          this._toastrService.success("Bank Details Successfully Updated");
          this._header.checkFunction(true);
        } else {
          this._toastrService.error(objS.message);
          this.spinner.hide();
        }
      }, (err) => {
        this.loading = this.showError = false;
        console.log('err', err)
      });
   
    }
  } 
}
