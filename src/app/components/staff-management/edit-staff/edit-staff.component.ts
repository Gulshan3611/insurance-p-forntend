import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { StaffService, RoleService, AuthService } from '../../../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Country, State, City } from 'country-state-city';
// import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.scss']
})
export class EditStaffComponent implements OnInit {


  isShow: any = false;
  isDisabled: any = false;
  submitted = false;
  public isButton: boolean = false;
  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;
  staffForm: any = {
  };
  requestData: any = {
  };

  // latitude: number;
  // longitude: number;
  // @ViewChild('search')
  // public searchElementRef: ElementRef;
  // address: string;
  // private geoCoder;
  reviewId: any = '';
  roleList: any = [];
  page: any = 1;
  limit: any = 10;


  @ViewChild('country') country: ElementRef
  @ViewChild('city') city: ElementRef
  countries = Country.getAllCountries();
  states = null;

  selectedCountry;
  selectedState;


  constructor(
    private _staffService: StaffService,
    private toastr: ToastrService,
    private _router: Router,
    private _roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    // private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    // this.loadGoogleMap();
    // this.getRolesListFromApi();
    if (this.activatedRoute.snapshot.params['id']) {
      this.reviewId = this.activatedRoute.snapshot.params['id'];
      this.staffDetails_f(this.reviewId);
    }
    this.getRoleLists_f()
  }

  checkpermission(value: any, type: any) {
    return this._authService.checkAccess(value, type)
  }
  // loadGoogleMap() {
  //   this.mapsAPILoader.load().then(() => {
  //     this.geoCoder = new google.maps.Geocoder;

  //     let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
  //     autocomplete.addListener("place_changed", () => {
  //       this.ngZone.run(() => {
  //         //get the place result
  //         let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  //         // console.log('place------', place);
  //         //verify result
  //         if (place.geometry === undefined || place.geometry === null) {
  //           return;
  //         }
  //         const data = [];
  //         const components = place.address_components;
  //         for (let i = 0, component; component = components[i]; i++) {
  //           const temp = component.long_name;
  //           data.push({
  //             address: component.long_name
  //           });
  //           this.staffForm.fulladdress = place.formatted_address;
  //           this.staffForm.address = place.formatted_address;
  //           if (component.types[0] === 'country') {
  //             const country = component.long_name;
  //             this.staffForm.country = country;
  //           } else if (component.types[0] === 'administrative_area_level_1') {
  //             const state = component.long_name;
  //             this.staffForm.state = state;
  //           } else if ((component.types[0] === 'locality') || (component.types[0] === 'sublocality_level_1')) {
  //             const city = component.long_name;
  //             this.staffForm.city = city;
  //           } else if (component.types[0] === 'postal_code') {
  //             const zip = component.long_name;
  //             this.staffForm.zipcode = zip;
  //           }
  //         }
  //         // console.log('check value---', this.staffForm)
  //         //set latitude, longitude and zoom
  //         this.latitude = place.geometry.location.lat();
  //         this.longitude = place.geometry.location.lng();
  //       });
  //     });
  //   });
  // }

  // getRolesListFromApi() {
  //   this.apiCalled = false;
  //   this._staffService
  //     .getRolesListWithoutPagination({
  //       searchBy: ''
  //     }).subscribe(objS => {
  //       this.apiCalled = true;
  //       if (objS.code == 200) {
  //         this.roleList = objS.data;
  //       } else {
  //         this.toastr.error(objS.message)
  //       }
  //     }, (err) => {
  //       console.log(err);
  //     })
  // }
  onSubmit(valid: any): void {
    this.showError = true;
    this.submitted = true;
    // console.log('checking---', valid, this.resource)
    if (valid) {
      this.loading = true;
      this.requestData.email = this.staffForm.email.toLocaleLowerCase();
      this.requestData.role = this.staffForm.role.id;
      this.requestData.address = this.staffForm.address;
      this.requestData.city = this.staffForm.city;
      this.requestData.constactPersonEmail = this.staffForm.constactPersonEmail;
      this.requestData.contactPersonEmail = this.staffForm.contactPersonEmail;
      this.requestData.contactPersonName = this.staffForm.contactPersonName;
      this.requestData.contactPersonNumber = this.staffForm.contactPersonNumber;
      this.requestData.country = this.staffForm.country;
      this.requestData.email = this.staffForm.email;
      this.requestData.name = this.staffForm.name;
      this.requestData.phone = this.staffForm.phone;
      this.requestData.state = this.staffForm.state;
      this.requestData.zipcode = this.staffForm.zipcode;
      this._staffService
        .updateStaffDetails(this.requestData, this.reviewId).subscribe(objS => {
          if (objS.code == 200) {
            this.loading = false;
            this.toastr.success(objS.message)
            this._router.navigate(['/staff-management/list']);
          } else if (objS.code == 401) {
            this.toastr.error(objS.message);
            this._authService.adminLogout();
            this._router.navigate(['/auth/login']);
          } else {
            this.loading = false;
            this.toastr.error(objS.message)
          }
        }, (err) => {
          console.log(err);
        })
    }
  }

  getRoleLists_f() {
    this.apiCalled = false;
    this._roleService.getRoleListsWithoutPag({
      page: this.page,
      limit: this.limit,
      searchBy: '',
    }).subscribe(objS => {
      // console.log('print response====', objS)
      this.loading = this.showError = false;
      if (objS.code == 200) {
        this.apiCalled = true;
        this.roleList = objS.data
        // console.log("this.roleList", this.roleList);
      } else if (objS.code == 401) {
        this.toastr.error(objS.message);
        this._authService.adminLogout();
        this._router.navigate(['/auth/login']);
      } else {
        this.toastr.error(objS.message);
      }
    }, (err) => {
      this.loading = this.showError = false;
      console.log('err', err)
    });
  }

  staffDetails_f(id: any) {
    this._staffService.staffDetails(this.reviewId).subscribe((res) => {
      if (res.code != 401) {
        if (res['data']) {
          this.staffForm = res['data'];
          console.log(this.staffForm);
        }
      } else if (res.code == 401) {
        this.toastr.error(res.message);
        this._authService.adminLogout();
        this._router.navigate(['/auth/login']);
      }
    }, (err) => {
      console.log('Error while Login', err);
    })
  }

  onCountryChange(event): void {
    this.staffForm.state = null
    this.states = State.getStatesOfCountry(event);
    this.selectedCountry = event;
  }

}
