import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { VendorService, AuthService, updateHeaderService } from "../../../_services";
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit {

  page: any = 1;
  vendorListLength: any = [];
  vendorList: any = [{}];
  searchForm: any = '';
  limit: any = 10;
  refreshToken: any;
  apiCalled: boolean = false;
  loading: boolean = false;
  showError: boolean = false;
  submitted: boolean = false;
  mediaUrl = environment.apiUrl;

  myForm: any = {};
  public passwordTextTypeOld = false;
  public passwordTextTypeNew = false;
  public passwordTextTypeRetype = false;

  constructor(
    private _toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _vendorService: VendorService,
    private _header: updateHeaderService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getVendorLists_f()
    // this.refreshToken = localStorage.getItem('go_d_r_a_t');
    // console.log("rrrrrrrrrrrrr",this.refreshToken.refresh.token);
  }

  checkpermission(value: any, type: any) {
    return this._authService.checkAccess(value, type)
  }

  onKeyUp(event: any) {
    this.searchForm = event.target.value.trim().replace(/^\s+/, '');
    // console.log("ssssssssssss", this.searchForm);
    this.getVendorLists_f()
  } 

  getVendorLists_f() {
    this.apiCalled = false;
    this._vendorService.getVendorLists({
      page: this.page,
      limit: this.limit,
      searchBy: this.searchForm,
    }).subscribe(objS => {
      this.loading = this.showError = false;
      this.apiCalled = true;
      this.vendorList = objS
      this.vendorListLength = objS.docs;
    }, (err) => {
      // this.loading = this.showError = false;
      console.log('err', err)
    });
  }

  refreshList(page: any, search: any) {
    this.page = page ? page : 1;

    console.log(this.page)
    
    this.getVendorLists_f()
  } 

  deleteVendor_f(request: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this vendor?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        console.log(request.id);
        this._vendorService.deleteVendor(request.id).subscribe(objS => {
          this.apiCalled = true;
          this.getVendorLists_f()
          this._toastrService.success(objS.message);
        }, (err) => {
          console.log(err);
        })
      }
    })

  }

  activateDeactivateVendor_f(request: any, status: string) {

    const requestData =
    {
      status: status,
      ids: [request.id]
    }

    console.log(requestData);
    if (request) {
      console.log(request);
      this._vendorService.activateDeactivateVendors(requestData).subscribe(objS => {
        this.apiCalled = true;
        this.getVendorLists_f()
        this._toastrService.success(objS.message);
      }, (err) => {
        console.log(err);
      })
    }
  }

}
