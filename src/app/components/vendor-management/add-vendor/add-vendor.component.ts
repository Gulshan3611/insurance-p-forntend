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
    private authService: AuthService,  
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit(): void {
     
  }

  selectVendor(event: any) {
    this.selectedVendor = event;
  }

  selectCurrency(event: any) {
    this.selectedCurrency = event;
  }
   
  onSubmit(valid: any): void {
    this.showError = true;
    this.submitted = true;
    console.log('checking---', valid, this.addVendor)
    if (valid) {
      this.loading = true;
      console.log("hhhhhhhhhh",this.addVendor)
      this._vendorService.addVendor(this.addVendor).subscribe(objS => {
        console.log('print response====', objS)
        this.loading = this.showError = false;
        if (objS.code == 200) {
          // this._authService.setDataAdmin(objS.data);
          this.spinner.hide();
          this._toastrService.success(objS.message);
          // this._header.checkFunction(true);
          this._router.navigate(['/vendor-management/list']);
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
