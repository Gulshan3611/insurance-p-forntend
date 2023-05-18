import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ResourceService, AuthService } from '../../../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { Country, State, City } from 'country-state-city';



@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html',
  styleUrls: ['./edit-resource.component.scss']
})
export class EditResourceComponent implements OnInit {

  isShow: any = false;
  isDisabled: any = false;
  submitted = false;
  public isButton: boolean = false;
  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;
  roleForm: any = {};
  addResource: any = {};
  resourceId: any = '';

  @ViewChild('country') country: ElementRef
  @ViewChild('city') city: ElementRef
  countries = Country.getAllCountries();
  states = null;

  selectedCountry;
  selectedState;

  resource: any = [
    // {
    //   moduleName: "Role And Permission",
    //   moduleId: "1",
    //   selectedAll: false,
    //   list: false,
    //   add: false,
    //   edit: false,
    //   view: false,
    //   delete: false,
    // }, {
    //   moduleName: "Staff Management",
    //   moduleId: "2",
    //   selectedAll: false,
    //   list: false,
    //   add: false,
    //   edit: false,
    //   view: false,
    //   delete: false,
    // }, {
    //   moduleName: "Vendor Management",
    //   moduleId: "3",
    //   selectedAll: false,
    //   list: false,
    //   add: false,
    //   edit: false,
    //   view: false,
    //   delete: false,
    // }, {
    //   moduleName: "Invoice Management",
    //   moduleId: "4",
    //   selectedAll: false,
    //   list: false,
    //   add: false,
    //   edit: false,
    //   view: false,
    //   delete: false,
    // }
  ];

  constructor(
    private _resourceService: ResourceService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public _authService: AuthService,
    private _toastrService: ToastrService,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id']) {
      this.resourceId = this.activatedRoute.snapshot.params['id'];
      this.getResourceDetailFromApi(this.resourceId);
    }
  }

  checkpermission(value: any, type: any) {
    return this._authService.checkAccess(value, type)
  }

  getResourceDetailFromApi(id: any) {
    this._resourceService.resourceDetails(this.resourceId).subscribe((res) => {
      if (res.code != 401) {
        if (res['data']) {
          this.addResource = res['data'];
        }
      } else {
        this._toastrService.error(res.message);
        this._authService.adminLogout();
        this.router.navigate(['/auth/login']);
      }
    }, (err) => {
      console.log('Error while Login', err);
    })
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
    this.addResource.file = files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.addResource.profilePhoto = reader.result;
    }

  }
  
  onSubmit(valid: any) {
    // console.log('checking---', valid, this.profile)
    this.showError = true;
    this.submitted = true;
    if (valid) {
      this.loading = true;
      this.spinner.show();
      // call api
      this.addResource.email = this.addResource.email.toLocaleLowerCase();
      const formdata = new FormData();
      if (this.addResource.profilePhoto) {
        formdata.append('profilePhoto', this.addResource.profilePhoto);
      } 
      
      // formdata.append('companyName', this.addResource.companyName.replace( /\s\s+/g, ' ' ));
      formdata.append('name', this.addResource.name);
      formdata.append('technology', this.addResource.technology);
      formdata.append('phone', this.addResource.phone);
      formdata.append('email', this.addResource.email);
      formdata.append('designation', this.addResource.designation);
      formdata.append('address', this.addResource.address);
      formdata.append('country', this.addResource.country);
      formdata.append('state', this.addResource.state);
      formdata.append('city', this.addResource.city);
      formdata.append('gender', this.addResource.gender);

      this._resourceService.updateResourceDetails(formdata, this.resourceId).subscribe(objS => {
        // console.log('print response====', objS)
        this.loading = this.showError = false; 89
        if (objS.code == 200) {
          // this._authService.setDataAdmin(objS.data);
          this.spinner.hide();
          this._toastrService.success(objS.message);
          // this._header.checkFunction(true);
          this.router.navigate(['/resource-management/list']);
        } else if (objS.code == 401) {
          this._toastrService.error(objS.message);
          this._authService.adminLogout();
          this.router.navigate(['/auth/login']);
        }
        else {
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
    this.addResource.state = null
    this.states = State.getStatesOfCountry(event);
    this.selectedCountry = event;
  }
}
