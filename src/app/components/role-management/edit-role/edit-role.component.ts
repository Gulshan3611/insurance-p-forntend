import { Component, OnInit } from '@angular/core';
import { RoleService, AuthService } from '../../../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

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
      moduleName: "Invoice Management",
      moduleId: "4",
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
    public authService: AuthService,
  ) { }

  ngOnInit(): void { }

  onSubmit(valid: any): void {
    this.showError = true;
    this.submitted = true;
    // console.log('checking---', valid, this.resource)
    if (valid) {
      this.loading = true;
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
