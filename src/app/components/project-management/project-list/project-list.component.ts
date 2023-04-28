import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ProjectService, AuthService, updateHeaderService } from "../../../_services";
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  page: any = 1;
  projectListLength: any = [];
  searchForm: any = '';
  limit: any = 10;
  refreshToken: any;
  projectList: any = {}
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
    private _projectService: ProjectService,
    private _header: updateHeaderService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getProjectLists_f()
    // this.refreshToken = localStorage.getItem('go_d_r_a_t');
    // console.log("rrrrrrrrrrrrr",this.refreshToken.refresh.token);
  }

  onKeyUp(event: any) {
    this.searchForm = event.target.value.trim().replace(/^\s+/, '');
    // console.log("ssssssssssss", this.searchForm);
    this.getProjectLists_f()
  }
  getProjectLists_f() {
    this.apiCalled = false;
    this._projectService.getProjectLists({
      page: this.page,
      limit: this.limit,
      searchBy: this.searchForm,
    }).subscribe(objS => {
      this.loading = this.showError = false;
      if (objS?.docs?.length != 0) {
        this.apiCalled = true;
        this.projectList = objS;
        this.projectListLength = objS.total;
        // console.log('print response====vendor',objS.docs.length, this.projectList)
      } else {
        this.projectList = []
        this.projectListLength = [];
        // this._toastrService.error(objS.message);
      }
    }, (err) => {
      this.loading = this.showError = false;
      console.log('err', err)
    });
  }
  refreshList(page: any, search: any) {
    this.page = page ? page : 1;
    this.getProjectLists_f()
  }

  deleteProject_f(request: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this project?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        console.log(request.id);
        this._projectService.deleteProject(request.id).subscribe(objS => {
          this.apiCalled = true;
          this.getProjectLists_f()
          this._toastrService.success(objS.message);
        }, (err) => {
          console.log(err);
        })
      }
    })

  }

  activateDeactivateProjects_f(request: any, status: string) {

    const requestData =
    {
      status: status,
      ids: [request.id]
    }

    console.log(requestData);
    if (request) {
      console.log(request);
      this._projectService.activateDeactivateProjects(requestData).subscribe(objS => {
        this.apiCalled = true;
        this.getProjectLists_f()
        this._toastrService.success(objS.message);
      }, (err) => {
        console.log(err);
      })
    }
  }
}
