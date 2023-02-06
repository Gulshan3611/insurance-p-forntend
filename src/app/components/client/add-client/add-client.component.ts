import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ProjectService, RoleService, AuthService } from '../../../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;
  submitted = false;
  addClient: any = {};  

  constructor(
    private _projectService: ProjectService,
    private toastr: ToastrService,
    private _router: Router,
    private _roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,  
  ) { }

  ngOnInit(): void {
     
  } 
   
  onSubmit(valid: any): void {
    this.showError = true;
    this.submitted = true;
    // console.log('checking---', valid, this.resource)
    if (valid) {
      this.loading = true;
      console.log(this.addClient)
      // this.staffForm.email = this.staffForm.email.toLocaleLowerCase();
      // this._staffService
      //   .addNewSubadmin(this.staffForm).subscribe(objS => {
      //     if (objS.code == 200) {
      //       this.loading = false;
      //       this.toastr.success(objS.message)
      //       this._router.navigate(['/staff/list']);
      //     } else {
      //       this.loading = false;
      //       this.toastr.error(objS.message)
      //     }
      //   }, (err) => {
      //     console.log(err);
      //   })
    }
  }

}
