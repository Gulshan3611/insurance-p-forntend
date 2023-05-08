import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ProjectService, VendorService, AuthService } from '../../../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddVendorComponent implements OnInit {

  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;
  submitted = false;
  addVendor: any = {};
  selectedVendor: any = '';
  selectedCurrency: any = '';

  constructor(
    private _projectService: ProjectService,
    private _toastrService: ToastrService,
    private _router: Router,
    private _vendorService: VendorService,
    private activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private spinner: NgxSpinnerService,

  ) { }

  ngOnInit(): void {

  }

  checkpermission(value: any, type: any) {
    return this._authService.checkAccess(value, type)
  }

  selectVendor(event: any) {
    this.selectedVendor = event;
  }

  selectCurrency(event: any) {
    this.selectedCurrency = event;
  }
  regexTest(pattern: string, value: string): boolean {
    return new RegExp(pattern).test(value);
  }

  onSubmit(valid: any): void {
    this.showError = true;
    this.submitted = true;
    if (valid) {
      this.loading = true;
      this._vendorService.addVendor(this.addVendor).subscribe(objS => {
        this.loading = this.showError = false;
        if (objS.code == 200) {
          // this._authService.setDataAdmin(objS.data);
          this.spinner.hide();
          this._toastrService.success(objS.message);
          // this._header.checkFunction(true);
          this._router.navigate(['/vendor-management/list']);
        } else if (objS.code == 401) {
          this._toastrService.error(objS.message);
          this._authService.adminLogout();
          this._router.navigate(['/auth/login']);
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
