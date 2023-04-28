import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ResourceService, AuthService, updateHeaderService } from "../../../_services";
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {

  page: any = 1;
  resourceListLength: any = [];
  searchForm: any ;
  limit: any = 10;
  refreshToken: any;
  resourceList: any = []
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
    private _resourceService:ResourceService,
    private _header: updateHeaderService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getResourceLists_f()
    this.refreshToken = localStorage.getItem('go_d_r_a_t');
    console.log("rrrrrrrrrrrrr",this.refreshToken);
  }

  onKeyUp(event: any) {
    this.searchForm=event.target.value.trim().replace(/^\s+/, '');
    console.log("ssssssssssss",this.searchForm);
    this.getResourceLists_f()
  }
  getResourceLists_f(){
    this.apiCalled = false;
    this._resourceService.getResourceLists({
      page: this.page,
      limit: this.limit,
      searchBy: this.searchForm,
    }).subscribe(objS => {
      console.log('print response====', objS.docs)
      this.loading = this.showError = false;
      if (objS.docs.length != 0) {
        this.resourceList = objS.docs
        this.apiCalled = true;
        this.resourceListLength = objS.docs;
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
    this.getResourceLists_f()
  }

  deleteResource_f(request: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this resource?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        console.log(request.id);
        this._resourceService.deleteResource(request.id).subscribe(objS => {
          this.apiCalled = true;
          this.getResourceLists_f()
          this._toastrService.success(objS.message);
        }, (err) => {
          console.log(err);
        })
      }
    })
    
  }
  activateDeactivateResources_f(request: any,status: string) {
   
    const requestData =
     {status: status,
      ids:[request.id]   
    }
    
    console.log(requestData);
      if (request) {
        console.log(request);
        this._resourceService.activateDeactivateResources(requestData).subscribe(objS => {
          this.apiCalled = true;
          this.getResourceLists_f()
          this._toastrService.success(objS.message);
        }, (err) => {
          console.log(err);
        })
      }
    }
    
  

}
