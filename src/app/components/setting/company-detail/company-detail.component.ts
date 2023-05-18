import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService, AuthService, updateHeaderService } from "../../../_services";
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { Country, State, City } from 'country-state-city';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {
  
  profile: any = { address2: '', secondaryPhone: '' }
  loading: boolean = false;
  showError: boolean = false;
  submitted: boolean = false;
  mediaUrl = environment.apiUrl;
  

  myForm: any = {};
  public passwordTextTypeOld = false;
  public passwordTextTypeNew = false;
  public passwordTextTypeRetype = false;

  @ViewChild('country') country: ElementRef
  @ViewChild('city') city: ElementRef
  countries = Country.getAllCountries();
  states = null;

  selectedCountry;
  selectedState;

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
    this.getOfficeDetail()
  }


  getOfficeDetail(){
    this._adminService.getOfiiceDetails("642fae7607090c079ea0de9a").subscribe(objS => {
      // console.log('print response====', objS)
      this.loading = this.showError = false;
      if (objS.code == 200) {
        this.profile = objS.data
      } else {
        this._toastrService.error(objS.message);
      }
    }, (err) => {
      this.loading = this.showError = false;
      console.log('err', err)
    });
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
      this.profile.logo = reader.result;
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
    
    if (mimeType.match(/image\/*/) == null) {
      this._toastrService.info("Only images are supported.");
      return;
    }
    var reader = new FileReader();
    this.profile.file = files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.profile.icon = reader.result;
    }
  }

  // Company 
  onSubmit(valid: any) {
    // console.log('checking---', valid, this.profile)
    this.showError = true;
    this.submitted = true;
    if (valid) {
      this.loading = true;
      this.spinner.show();
      // call api
      this.profile.email = this.profile.email.toLocaleLowerCase();
      const formdata = new FormData();
      if (this.profile.logo) {
        formdata.append('logo', this.profile.logo);
      }
      if (this.profile.icon) {
        formdata.append('icon', this.profile.icon);
      }
      
      // formdata.append('companyName', this.profile.companyName.replace( /\s\s+/g, ' ' ));
      formdata.append('companyName', this.profile.companyName);
      formdata.append('businessDomain', this.profile.businessDomain);
      formdata.append('registrationNumber', this.profile.registrationNumber);
      formdata.append('iecCode', this.profile.iecCode);
      formdata.append('gstin', this.profile.gstin);
      formdata.append('companyPan', this.profile.companyPan);
      formdata.append('tanNumber', this.profile.tanNumber);
      formdata.append('gstPercentage', this.profile.gstPercentage);
      formdata.append('address1', this.profile.address1);
      formdata.append('address2', this.profile.address2);
      formdata.append('country', this.profile.country);
      formdata.append('state', this.profile.state);
      formdata.append('city', this.profile.city);
      formdata.append('pinCode', this.profile.pinCode);
      formdata.append('primaryPhone', this.profile.primaryPhone);
      formdata.append('secondaryPhone', this.profile.secondaryPhone);
      formdata.append('fax', this.profile.fax);
      formdata.append('websiteUrl', this.profile.websiteUrl);
      formdata.append('email', this.profile.email);

      this._adminService.updateOfiiceDetails(formdata).subscribe(objS => {
        console.log('print response====', objS)
        this.loading = this.showError = false;
        if (objS.code == 200) {
          // this._authService.setDataAdmin(objS.data);
          this.spinner.hide();
          // this.router.navigate(['/setting']);
          this._toastrService.success(objS.message);
          this._header.checkFunction(true);
          this.getOfficeDetail()
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
  onCountryChange(event): void {
    this.profile.state = null
    this.states = State.getStatesOfCountry(event);
    this.selectedCountry = event;
  }
}
