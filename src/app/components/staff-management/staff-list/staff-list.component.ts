import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { StaffService, AuthService, updateHeaderService } from "../../../_services";
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {

  page: any = 1;
  staffListLength: any = [];
  searchForm: any = '';
  formattedDate: any;
  limit: any = 10;
  refreshToken: any;
  staffList: any = {}
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
    private _staffService: StaffService,
    private _header: updateHeaderService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getStaffLists_f()
    this.refreshToken = localStorage.getItem('go_d_r_a_t');
    console.log("rrrrrrrrrrrrr", this.refreshToken.refresh.token);
  }

  onKeyUp(event: any) {
    this.searchForm = event.target.value.trim().replace(/^\s+/, '');
    console.log("ssssssssssss", this.searchForm);
    this.getStaffLists_f()
  }
  getStaffLists_f() {
    this.apiCalled = false;
    this._staffService.getStaffLists({
      page: this.page,
      limit: this.limit,
      searchBy: this.searchForm,
    }).subscribe(objS => {
      this.loading = this.showError = false;
      if (objS.code == 200) {
        this.apiCalled = true;
        this.staffList = objS.data
        console.log('print response====', this.staffList)
        this.staffListLength = objS.data.docs;
      } else {
        this._toastrService.error(objS.message);
      }
    }, (err) => {
      this.loading = this.showError = false;
      console.log('err', err)
    });
  }
  refreshList(page: any, search: any) {
    this.page = page ? page : 1;
    this.getStaffLists_f()
  }

  deleteStaff_f(request: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this Staff?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        console.log(request.id);
        this._staffService.deleteStaff(request.id).subscribe(objS => {
          this.apiCalled = true;
          this.getStaffLists_f()
          this._toastrService.success(objS.message);
        }, (err) => {
          console.log(err);
        })
      }
    })

  }
  activateDeactivatestaff_f(request: any, status: string) {

    const requestData =
    {
      status: status,
      ids: [request.id]
    }
    if (request) {
      console.log(request);
      this._staffService.activateDeactivateStaff(requestData).subscribe(objS => {
        this.apiCalled = true;
        this.getStaffLists_f()
        this._toastrService.success(objS.message);
      }, (err) => {
        console.log(err);
      })
    }
  }

}
