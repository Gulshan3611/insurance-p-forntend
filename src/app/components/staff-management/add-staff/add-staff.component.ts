import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { StaffService, RoleService, AuthService } from '../../../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
// import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {

  isShow: any = false;
  isDisabled: any = false;
  submitted = false;
  public isButton: boolean = false;
  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;
  staffForm: any = {
    status: "1",
    role: "",
    type: "admin"
  };
  // latitude: number;
  // longitude: number;
  // @ViewChild('search')
  // public searchElementRef: ElementRef;
  // address: string;
  // private geoCoder;
  roleList: any = [];
  constructor(
    private _staffService: StaffService,
    private toastr: ToastrService,
    private _router: Router,
    private _roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    // private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    // this.loadGoogleMap();
    // this.getRolesListFromApi();
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
      // this.staffForm.email = this.staffForm.email.toLocaleLowerCase();
      // this._staffService
      //   .addNewSubadmin(this.staffForm).subscribe(objS => {
      //     if (objS.code == 200) {
      //       this.loading = false;
      //       this.toastr.success(objS.message)
      //       this._router.navigate(['/staff/list']);
      //     } else {
      //       this.loading = false;
      //       this.toastr.error(objS.message)
      //     }
      //   }, (err) => {
      //     console.log(err);
      //   })
    }
  }

}
