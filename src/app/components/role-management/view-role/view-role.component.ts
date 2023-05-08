import { Component, OnInit } from '@angular/core';
import { RoleService, AuthService } from '../../../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.scss']
})
export class ViewRoleComponent implements OnInit {

  isShow: any = false;
  isDisabled: any = false;
  submitted = false;
  public isButton: boolean = false;
  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;
  roleForm: any = {};
  reviewId: any = '';



  resource: any = [
    // {
    //   moduleName: "Role And Permission",
    //   moduleId: "1",
    //   selectedAll: false,
    //   list: false,
    //   add: false,
    //   edit: false,
    //   view: false,
    //   delete: false,
    // }
    // , {
    // moduleName: "Staff Management",
    // moduleId: "2",
    // selectedAll: false,
    // list: false,
    // add: false,
    // edit: false,
    // view: false,
    // delete: false,
    // }, {
    //   moduleName: "Vendor Management",
    //   moduleId: "3",
    //   selectedAll: false,
    //   list: false,
    //   add: false,
    //   edit: false,
    //   view: false,
    //   delete: false,
    // }, {
    //   moduleName: "Invoice Management",
    //   moduleId: "4",
    //   selectedAll: false,
    //   list: false,
    //   add: false,
    //   edit: false,
    //   view: false,
    //   delete: false,
    // }
  ];

  constructor(
    private _roleService: RoleService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id']) {
      this.reviewId = this.activatedRoute.snapshot.params['id'];
      this.roleDetails_f(this.reviewId);
    }
  }

  selectAllList(index: any) {
    this.resource[index].list = this.resource[index].selectedAll;
    this.resource[index].add = this.resource[index].selectedAll;
    this.resource[index].edit = this.resource[index].selectedAll;
    this.resource[index].delete = this.resource[index].selectedAll;
    this.resource[index].view = this.resource[index].selectedAll;
  }
  checkIfAllValues(index: any) {
    if (this.resource[index].list && this.resource[index].add && this.resource[index].edit && this.resource[index].delete && this.resource[index].view) {
      this.resource[index].selectedAll = true;
    } else {
      this.resource[index].selectedAll = false;
    }
  }
  roleDetails_f(id: any) {
    this._roleService.roleDetails(this.reviewId).subscribe((res) => {
      if (res.code != 401) {
        if (res['data']) {
          this.roleForm = res['data'];
          this.resource = res['data'].resource.map(item => ({
            moduleName: item.moduleName,
            moduleId: item.moduleId,
            selectedAll: item.permissions.includes("selectedAll"),
            list: item.permissions.includes("list"),
            add: item.permissions.includes("add"),
            edit: item.permissions.includes("edit"),
            view: item.permissions.includes("view"),
            delete: item.permissions.includes("delete")
          }));
          console.log(this.resource);

        }
      } else {
        this.toastr.error(res.message);
        this.authService.adminLogout();
        this.router.navigate(['/auth/login']);
      }
    }, (err) => {
      console.log('Error while Login', err);
    })
  }

}
