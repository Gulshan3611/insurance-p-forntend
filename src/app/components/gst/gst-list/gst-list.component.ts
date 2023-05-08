import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { GstService, AuthService } from "../../../_services";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-gst-list',
  templateUrl: './gst-list.component.html',
  styleUrls: ['./gst-list.component.scss']
})
export class GstListComponent implements OnInit {

  apiCalled: boolean = false;
  gstList: any = [];
  gstListLength: any = [];
  searchForm: any = '';
  page: any = 1;
  limit: any = 10;

  constructor(
    private _toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _gstService: GstService,
    private spinner: NgxSpinnerService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getGstListFromApi();
  }

  onKeyUp(event: any) {
    this.searchForm = event.target.value.trim().replace(/^\s+/, '');
    // console.log("ssssssssssss", this.searchForm);
    this.getGstListFromApi();
  }

  checkpermission(value: any, type: any) {
    return this._authService.checkAccess(value, type)
  }

  getGstListFromApi() {
    this.apiCalled = false;
    this._gstService.getGstList({
      page: this.page,
      limit: this.limit,
      searchBy: this.searchForm,
    }).subscribe(objS => {
      this.apiCalled = true;
      if (objS.code != 401) {
        this.gstList = objS;
        this.gstListLength = objS.total;
        console.log(this.gstListLength)
      } else {
        this._toastrService.error(objS.message);
        this._authService.adminLogout();
        this.router.navigate(['/auth/login']);
      }
    }, (err) => {
      console.log(err);
    })
  }

  refreshList(page: any, search: any) {
    this.page = page ? page : 1;
    this.getGstListFromApi();
  }

  // activateDeactivateGst(request: any, type: any) {
  //   // var msg = '';
  //   // if (type == 'deactive') {
  //   //   msg = 'Do you want to deactive Gst?';

  //   // } else {
  //   //   msg = 'Do you want to active Gst?';
  //   // }
  //   // Swal.fire({
  //   //   title: 'Are you sure?',
  //   //   text: msg,
  //   //   icon: 'warning',
  //   //   showCancelButton: true,
  //   //   confirmButtonColor: '#7367F0',
  //   //   cancelButtonColor: '#E42728',
  //   //   confirmButtonText: 'Yes',
  //   //   customClass: {
  //   //     confirmButton: 'btn btn-primary',
  //   //     cancelButton: 'btn btn-danger ml-1'
  //   //   }
  //   // }).then((result: any) => {
  //   //   if (result.value) {
  //       let data = {
  //         ids: [request?.id],
  //         status: type
  //       }
  //       console.log(data)
  //       this._gstService
  //         .activateDeactivateGst(data).subscribe(objS => {
  //           this.apiCalled = true;
  //           if (objS.code == 200) {
  //             // this.toastr.success(objS.message);
  //             this.getGstListFromApi()
  //           } else {
  //             // this.toastr.error(objS.message)
  //           }
  //         }, (err) => {
  //           console.log(err);
  //         })
  //       // }
  //   // })
  // } 

  deleteGst(request: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this Gst?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        console.log(request.id);
        this._gstService.deleteGst(request.id).subscribe(objS => {
          this.apiCalled = true;
          if (objS.code != 401) {
            this.getGstListFromApi();
            this._toastrService.success(objS.message);
          } else {
            this._toastrService.error(objS.message);
            this._authService.adminLogout();
            this.router.navigate(['/auth/login']);
          }
        }, (err) => {
          console.log(err);
        })
      }
    })

  }

  activateDeactivateGst(request: any, status: string) {
    const requestData =
    {
      status: status,
      ids: [request.id]
    }
    var msg = '';
    if (status == 'deactive') {
      msg = 'Do you want to deactive this Gst ?';
    } else {
      msg = 'Do you want to active this Gst?';
    }
    Swal.fire({
      title: 'Are you sure?',
      text: msg,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7367F0',
      cancelButtonColor: '#E42728',
      confirmButtonText: 'Yes',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      }
    }).then((result: any) => {
      if (result.value) {

        // console.log(requestData);
        if (request) {
          console.log(request);
          this._gstService.activateDeactivateGst(requestData).subscribe(objS => {
            this.apiCalled = true;
            if (objS.code != 401) {
              this.getGstListFromApi()
              this._toastrService.success(objS.message);
            } else {
              this._toastrService.error(objS.message);
              this._authService.adminLogout();
              this.router.navigate(['/auth/login']);
            }
          }, (err) => {
            console.log(err);
          })
        }
      }
    });
  }

}
