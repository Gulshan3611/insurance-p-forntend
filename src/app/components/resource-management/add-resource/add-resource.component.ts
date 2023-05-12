import { Component, OnInit } from '@angular/core';
import { RoleService, AuthService, ProjectService, ResourceService } from '../../../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
+3


@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {

  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;
  submitted = false;
  addResource: any = { gender: '' };
  selectedResource: any = '';
  selectedCurrency: any = '';

  constructor(
    private _projectService: ProjectService,
    private _toastrService: ToastrService,
    private _router: Router,
    private _resourceService: ResourceService,
    private activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private spinner: NgxSpinnerService

  ) { }


  ngOnInit(): void {

  }

  checkpermission(value: any, type: any) {
    return this._authService.checkAccess(value, type)
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
    if (mimeType.match(/image\/*/) == null) {
      this._toastrService.info("Only images are supported.");
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.addResource.profilePhoto = reader.result;
    }

  }
  selectResource(event: any) {
    this.selectedResource = event;
  }

  selectCurrency(event: any) {
    this.selectedCurrency = event;
  }

  // onSubmit(valid: any): void {
  //   this.showError = true;
  //   this.submitted = true;
  //   console.log('checking---', valid, this.addResource)
  //   if (valid) {
  //     this.loading = true;
  //     // console.log("hhhhhhhhhh",this.addResource)
  //     this._resourceService.addResource(this.addResource).subscribe(objS => {
  //       console.log('print response====', objS)
  //       this.loading = this.showError = false; 89
  //       if (objS.code == 200) {
  //         // this._authService.setDataAdmin(objS.data);
  //         this.spinner.hide();
  //         this._toastrService.success(objS.message);
  //         // this._header.checkFunction(true);
  //         this._router.navigate(['/resource-management/list']);
  //       } else if (objS.code == 401) {
  //         this._toastrService.error(objS.message);
  //         this._authService.adminLogout();
  //         this._router.navigate(['/auth/login']);
  //       }
  //       else {
  //         this._toastrService.error(objS.message);
  //         this.spinner.hide();
  //       }
  //     }, (err) => {
  //       this.loading = this.showError = false;
  //       console.log('err', err)
  //     });
  //   }
  // }

  onSubmit(valid: any) {
    // console.log('checking---', valid, this.profile)
    this.showError = true;
    this.submitted = true;
    if (valid) {
      this.loading = true;
      this.spinner.show();
      // call api
      this.addResource.email = this.addResource.email.toLocaleLowerCase();
      const formdata = new FormData();
      if (this.addResource.profilePhoto) {
        formdata.append('profilePhoto', this.addResource.profilePhoto);
      } 
      
      // formdata.append('companyName', this.addResource.companyName.replace( /\s\s+/g, ' ' ));
      formdata.append('name', this.addResource.name);
      formdata.append('technology', this.addResource.technology);
      formdata.append('phone', this.addResource.phone);
      formdata.append('email', this.addResource.email);
      formdata.append('designation', this.addResource.designation);
      formdata.append('address', this.addResource.address);
      formdata.append('country', this.addResource.country);
      formdata.append('state', this.addResource.state);
      formdata.append('city', this.addResource.city);
      formdata.append('gender', this.addResource.gender);

      this._resourceService.addResource(formdata).subscribe(objS => {
        console.log('print response====', objS)
        this.loading = this.showError = false; 89
        if (objS.code == 200) {
          // this._authService.setDataAdmin(objS.data);
          this.spinner.hide();
          this._toastrService.success(objS.message);
          // this._header.checkFunction(true);
          this._router.navigate(['/resource-management/list']);
        } else if (objS.code == 401) {
          this._toastrService.error(objS.message);
          this._authService.adminLogout();
          this._router.navigate(['/auth/login']);
        }
        else {
          this._toastrService.error(objS.message);
          this.spinner.hide();
        }
      }, (err) => {
        this.loading = this.showError = false;
        console.log('err', err)
      });
    }
  }

}

