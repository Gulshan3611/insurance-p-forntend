import { Component, OnInit } from '@angular/core';
import { RoleService, AuthService } from '../../../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html',
  styleUrls: ['./edit-resource.component.scss']
})
export class EditResourceComponent implements OnInit {

  isShow: any = false;
  isDisabled: any = false;
  submitted = false;
  public isButton: boolean = false;
  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;
  roleForm: any = {};
  addVendor: any = {};
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
    // }, {
    //   moduleName: "Staff Management",
    //   moduleId: "2",
    //   selectedAll: false,
    //   list: false,
    //   add: false,
    //   edit: false,
    //   view: false,
    //   delete: false,
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
    private _toastrService: ToastrService,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id']) {
      this.reviewId = this.activatedRoute.snapshot.params['id'];
      this.roleDetails_f(this.reviewId);
    }
  }
  handleFileSelect(evt: any) {
    var files = evt.target.files;
    if (files.length === 0)
      return;
    const fsize = files[0].size;
    const file = Math.round((fsize / 1024 / 1024));
    var mimeType = files[0].type;
    console.log('call size====', fsize, file, mimeType)
    // if (!(file <= 100)) {
    //   return this._toastrService.warning("File too Big, please select a file less than 100mb")
    // }
    var reader = new FileReader();
    this.addVendor.file = files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.addVendor.profilePhoto = reader.result;
    }

  }

  onSubmit(valid: any): void {
    this.showError = true;
    this.submitted = true;
    // console.log('checking---', valid, this.resource)
    if (valid) {
      this.loading = true;
      this.spinner.show();
      const permissions = Object.keys(this.resource[0]).filter(key => key !== "moduleName" && key !== "moduleId");
      const convertedResource = this.resource.reduce((acc, item) => ({
        name: item.moduleName,
        resource : [{
          permissions: permissions.filter(permission => item[permission]),
        }],
      }), {});
      console.log("send",convertedResource);
      
      this._roleService.updateRoleDetails(convertedResource, this.reviewId).subscribe(objS => {
        this.loading = this.showError = false;
        if (objS.code == 200) {
          this._toastrService.success(objS.message);
          this.spinner.hide();
          // this.router.navigate(['/review/list']);
          this.loading = false;
          this.roleDetails_f(this.reviewId);
        } else {
          this._toastrService.error(objS.message);
          this.loading = false;
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
  roleDetails_f(id: any) {
    this._roleService.roleDetails(this.reviewId).subscribe((res) => {
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
        console.log("get",this.resource);
        console.log("5555",res['data']);

      }
    }, (err) => {
      console.log('Error while Login', err);
    })
  }
}
