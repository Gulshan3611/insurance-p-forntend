import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ProjectService, VendorService, AuthService } from '../../../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.scss']
})
export class EditVendorComponent implements OnInit {

  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;
  submitted = false;
  addVendor: any = {};
  selectedVendor: any = '';
  selectedCurrency: any = '';
  reviewId: any = '';
  com: any;

  constructor(
    private _projectService: ProjectService,
    private toastr: ToastrService,
    private _router: Router,
    private _vendorService: VendorService,
    private activatedRoute: ActivatedRoute,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id']) {
      this.reviewId = this.activatedRoute.snapshot.params['id'];
      this.vendorDetails_f(this.reviewId);
    }
  }

  checkpermission(value: any, type: any) {
    return this._authService.checkAccess(value, type)
  }

  selectVendor(event: any) {
    this.selectedVendor = event;
    if(event == 0) {
      this.addVendor.companyName = '';
      // console.log('-----------', this.addVendor.companyName);
      this.addVendor.companyName = '';
    } else {
      this.addVendor.companyName = this.com;
      // console.log('-----------', this.addVendor.companyName);
    }
  }

  selectCurrency(event: any) {
    this.selectedCurrency = event;
  }

  onSubmit(valid: any): void {
    this.showError = true;
    this.submitted = true;
    // console.log('checking---', valid, this.resource)
    if (valid) {
      this.loading = true;
      // console.log(this.addVendor)
      this.addVendor.email = this.addVendor.email.toLocaleLowerCase();
      this._vendorService
        .updateVendorDetails(this.addVendor, this.reviewId).subscribe(objS => {
          if (objS.code == 200) {
            this.loading = false;
            this.toastr.success(objS.message)
            this._router.navigate(['/vendor-management/list']);
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

  vendorDetails_f(id: any) {
    this._vendorService.vendorDetails(this.reviewId).subscribe((res) => {
      if (res.code != 401) {
        if (res['data']) {
          this.addVendor = res['data'];
          // console.log(this.addVendor); 
          if (this.addVendor.vendorType == 0) {
            this.selectedVendor = '0';
          } else {
            this.selectedVendor = '1';
          }
          this.com = this.addVendor.companyName
        }
      } else {
        this.toastr.error(res.message);
        this._authService.adminLogout();
        this._router.navigate(['/auth/login']);
      }
    }, (err) => {
      console.log('Error while Login', err);
    })
  }

}
