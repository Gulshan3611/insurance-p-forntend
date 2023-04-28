import { Component, OnInit } from '@angular/core';
import { RoleService, AuthService } from '../../../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
+3


@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {

  isShow: any = false;
  isDisabled: any = false;
  submitted = false;
  public isButton: boolean = false;
  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;
  roleForm: any = {};

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
    }
    // , {
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
    private _toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit(): void { }

  onSubmit(valid: any): void {
    this.showError = true;
    this.submitted = true;
    console.log('checking---', this.roleForm, valid, this.resource)

    if (valid) {
      var updated_resource = [];
      this.resource.forEach((res) => {
        var resource_obj = { moduleName: res.moduleName, moduleId: res.moduleId, permissions: [] };
        for (let key of Object.keys(res)) {
          if (res[key] == true && key != 'moduleId') resource_obj.permissions.push(key);
        }
        updated_resource.push(resource_obj)
      })
      this.roleForm['resource'] = updated_resource;

      this.loading = true;
      this.spinner.show();
      // call api

      this._roleService.addRole(this.roleForm).subscribe(objS => {
        console.log('print response====', objS)
        this.loading = this.showError = false;
        if (objS.code == 200) {
          // this._authService.setDataAdmin(objS.data);
          this.spinner.hide();
          this._toastrService.success(objS.message);
          // this._header.checkFunction(true);
          this.router.navigate(['/role-management/list']);
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
}
