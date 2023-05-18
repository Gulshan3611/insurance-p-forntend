import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ResourceService, AuthService } from '../../../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { Country, State, City } from 'country-state-city';


@Component({
  selector: 'app-view-resource',
  templateUrl: './view-resource.component.html',
  styleUrls: ['./view-resource.component.scss']
})
export class ViewResourceComponent implements OnInit {

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

  constructor(
    private _resourceService: ResourceService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private _toastrService: ToastrService,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id']) {
      this.resourceId = this.activatedRoute.snapshot.params['id'];
      this.getResourceDetailFromApi(this.resourceId);
    }
  }

  getResourceDetailFromApi(id: any){
    this._resourceService.resourceDetails(this.resourceId).subscribe((res) => {
      if(res.code !=401) {
      if (res['data']) {
        this.addResource = res['data'];
      }
    } else {
        this._toastrService.error(res.message);
        this.authService.adminLogout();
        this.router.navigate(['/auth/login']);
      }
    }, (err) => {
      console.log('Error while Login', err);
    })
  }
}
