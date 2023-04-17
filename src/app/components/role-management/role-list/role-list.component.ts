import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { RoleService, AuthService, updateHeaderService } from "../../../_services";
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  page: any = 1;
  roleListLength: any = [];
  searchForm: any ;
  limit: any = 10;
  refreshToken: any;
  roleList: any = {}
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
    private _roleService:RoleService,
    private _header: updateHeaderService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getRoleLists_f()
    this.refreshToken = localStorage.getItem('go_d_r_a_t');
    console.log("rrrrrrrrrrrrr",this.refreshToken.refresh.token);
  }

  onKeyUp(event: any) {
    this.searchForm=event.target.value.trim().replace(/^\s+/, '');
    console.log("ssssssssssss",this.searchForm);
    this.getRoleLists_f()
  }
  getRoleLists_f(){
    this.apiCalled = false;
    this._roleService.getRoleLists({
      page: this.page,
      limit: this.limit,
      searchBy: this.searchForm,
    }).subscribe(objS => {
      console.log('print response====', objS)
      this.loading = this.showError = false;
      if (objS.code == 200) {
        this.apiCalled = true;
        this.roleList = objS.data
        this.roleListLength = objS.data.docs;
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
    this.getRoleLists_f()
  }

  deleteRole_f(request: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this role?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        console.log(request.id);
        this._roleService.deleteRole(request.id).subscribe(objS => {
          this.apiCalled = true;
          this.getRoleLists_f()
          this._toastrService.success(objS.message);
        }, (err) => {
          console.log(err);
        })
      }
    })
    
  }
  activateDeactivateRoles_f(request: any,status: string) {
   
    const requestData =
     {status: status,
      ids:[request.id]   
    }
    
    console.log(requestData);
      if (request) {
        console.log(request);
        this._roleService.activateDeactivateRoles(requestData).subscribe(objS => {
          this.apiCalled = true;
          this.getRoleLists_f()
          this._toastrService.success(objS.message);
        }, (err) => {
          console.log(err);
        })
      }
    }
    
  

}
