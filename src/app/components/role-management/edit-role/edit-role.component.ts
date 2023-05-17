import { Component, OnInit } from '@angular/core';
import { RoleService, AuthService } from '../../../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {

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
    {
      moduleName: "Role And Permission",
      moduleId: "1",
      selectedAll: false,
      list: false,
      add: false,
      edit: false,
      view: false,
      delete: false,
    }, {
      moduleName: "Staff Management",
      moduleId: "2",
      selectedAll: false,
      list: false,
      add: false,
      edit: false,
      view: false,
      delete: false,
    }, {
      moduleName: "Vendor Management",
      moduleId: "3",
      selectedAll: false,
      list: false,
      add: false,
      edit: false,
      view: false,
      delete: false,
    }, {
      moduleName: "Project Management",
      moduleId: "4",
      selectedAll: false,
      list: false,
      add: false,
      edit: false,
      view: false,
      delete: false,
    }, {
      moduleName: "Invoice Management",
      moduleId: "5",
      selectedAll: false,
      list: false,
      add: false,
      edit: false,
      view: false,
      delete: false,
    }, {
      moduleName: "GST Management",
      moduleId: "6",
      selectedAll: false,
      list: false,
      add: false,
      edit: false,
      view: false,
      delete: false,
    }, {
      moduleName: "Resource Management",
      moduleId: "7",
      selectedAll: false,
      list: false,
      add: false,
      edit: false,
      view: false,
      delete: false,
    }
  ];

  constructor(
    private _roleService: RoleService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public _authService: AuthService,
    private _toastrService: ToastrService,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id']) {
      this.reviewId = this.activatedRoute.snapshot.params['id'];
      this.roleDetails_f(this.reviewId);
    }
  }
  checkpermission(value: any, type: any) {
    return this._authService.checkAccess(value, type)
  }

  onSubmit(valid: any): void {
    this.showError = true;
    this.submitted = true;
    // console.log('checking---', valid, this.resource)
    if (valid) {
      this.loading = true;
      this.spinner.show();
      var updated_resource = [];
      this.resource.forEach((res) => {
        var resource_obj = { moduleName: res.moduleName, moduleId: res.moduleId, permissions: [] };
        for (let key of Object.keys(res)) {
          if (res[key] == true && key != 'moduleId') resource_obj.permissions.push(key);
        }
        updated_resource.push(resource_obj)
      })
      this.roleForm['resource'] = updated_resource;

      this._roleService.updateRoleDetails(this.roleForm, this.reviewId).subscribe(objS => {
        this.loading = this.showError = false;
        if (objS.code == 200) {
          this._toastrService.success(objS.message);
          this.spinner.hide();
          this.router.navigate(['/role-management/list']);
          this.loading = false;
          this.roleDetails_f(this.reviewId);
        } else if (objS.code == 401) {
          this._toastrService.error(objS.message);
          this._authService.adminLogout();
          this.router.navigate(['/auth/login']);
        } else {
          this._toastrService.error(objS.message);
          this.loading = false;
          this.spinner.hide();
        }
      }, (err) => {
        this.loading = this.showError = false;
        console.log('err', err)
        this._toastrService.error(err);
      });

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
          console.log("get", this.resource);
          // console.log("5555",res['data']);

        }
      } else {
        this._toastrService.error(res.message);
        this._authService.adminLogout();
        this.router.navigate(['/auth/login']);
      }
    }, (err) => {
      console.log('Error while Login', err);
    })
  }
}
