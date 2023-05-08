import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { VendorService, RoleService, AuthService } from '../../../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-vendor',
  templateUrl: './view-vendor.component.html',
  styleUrls: ['./view-vendor.component.scss']
})
export class ViewVendorComponent implements OnInit {

  isShow: any = false;
  isDisabled: any = false;
  submitted = false;
  public isButton: boolean = false;
  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;
  roleList: any = [];
  // staffForm: any = {
  //   status: "1",
  //   role: "",
  //   type: "admin"
  // };
  addVendor :any ;
  reviewId: any = '';
  
  constructor(
    private _vendorService:VendorService,
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
      this.vendorDetails_f(this.reviewId);      
    }
  }

  vendorDetails_f(id: any){
    this._vendorService.vendorDetails(this.reviewId).subscribe((res) => {
      if(res.code != 401) {
      if (res['data']) {
        this.addVendor = res['data'];
        console.log(res['data']); 
      }} else {
        this.toastr.error(res.message);
        this.authService.adminLogout();
        this._router.navigate(['/auth/login']);
      } 
    }, (err) => {
      console.log('Error while Login', err);
    })  
  }


}