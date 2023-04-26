import { Component, OnInit } from '@angular/core';
import { RoleService, AuthService ,ProjectService,VendorService} from '../../../_services';
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
  addVendor: any = {}; 
  selectedVendor: any = '';
  selectedCurrency: any = '';

  constructor(
    private _projectService: ProjectService,
    private _toastrService: ToastrService,
    private _router: Router,
    private _vendorService: VendorService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,  
    private spinner: NgxSpinnerService

  ) { }
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

  ngOnInit(): void {
     
  }

  selectVendor(event: any) {
    this.selectedVendor = event;
  }

  selectCurrency(event: any) {
    this.selectedCurrency = event;
  }
   
  onSubmit(valid: any): void {
    this.showError = true;
    this.submitted = true;
    console.log('checking---', valid, this.addVendor)
    if (valid) {
      this.loading = true;
      console.log("hhhhhhhhhh",this.addVendor)
      this._vendorService.addVendor(this.addVendor).subscribe(objS => {
        console.log('print response====', objS)
        this.loading = this.showError = false;
        if (objS.code == 200) {
          // this._authService.setDataAdmin(objS.data);
          this.spinner.hide();
          this._toastrService.success(objS.message);
          // this._header.checkFunction(true);
          this._router.navigate(['/vendor-management/list']);
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

}

