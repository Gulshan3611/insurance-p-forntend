import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { StaffService, RoleService, AuthService } from '../../../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Country, State, City } from 'country-state-city';

@Component({
  selector: 'app-view-staff',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.scss']
})
export class ViewStaffComponent implements OnInit {

  isShow: any = false;
  isDisabled: any = false;
  submitted = false;
  public isButton: boolean = false;
  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;
  roleList: any = [];
  staffForm: any = {
    status: "1",
    role: "",
    type: "admin"
  };
  reviewId: any = '';
  
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
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    // private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {

    if (this.activatedRoute.snapshot.params['id']) {
      this.reviewId = this.activatedRoute.snapshot.params['id'];
      this.staffDetails_f(this.reviewId);      
    }
  }

  staffDetails_f(id: any){
    this._staffService.staffDetails(this.reviewId).subscribe((res) => {
      if (res['data']) {
        this.staffForm = res['data'];
        console.log(res['data']);
        
      }
    }, (err) => {
      console.log('Error while Login', err);
    })  
  }

}
