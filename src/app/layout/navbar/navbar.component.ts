import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router'
import { AdminService, AuthService, updateHeaderService } from '../../_services';
import { environment} from '../../../environments/environment'
import { SidebarService } from '../../_services';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  userType: any = "";
  refreshToken: any;
  header: any;
  profile: any = {};
  myForm: any;
  profilePhoto: any;
  mediaUrl = environment.apiUrl;

  constructor(
    private _router: Router,
    private _adminService:AdminService,
    private _authService: AuthService,
    private _toastrService: ToastrService,
    public _sidebarService: SidebarService,
    private _header: updateHeaderService
  ) { }

  ngOnInit(): void {
    this.profile = this._authService.getAdminData();
    this.refreshToken = localStorage.getItem('go_d_r_a_t');
    console.log(this.profile);
    
    // this._header.$isCalledService
    // .subscribe((data: any) => {
    //   console.log('print top nav bar--', data)
    //   if (data) {
    //     this.userType = localStorage.getItem('userType');
    //     this.profile = this._authService.getAdminData();
    //     this.myForm = this.profile
    //     this.profilePhoto = this.mediaUrl + '/media/preview?filename=' + this.profile.image;
    //   }
    // })
    // this.userType = localStorage.getItem('userType');
    // this.profile = this._authService.getAdminData();
    // this.myForm = this.profile
    // this.profilePhoto = this.mediaUrl + '/media/preview?filename=' + this.profile.image;
  }

  // logout(data: any) {
  //   this._adminService.logOut(data.id);
  //   this._authService.adminLogout();
  //   this._router.navigate(['/auth/login']);
  // }


  logout(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to logout!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,logout'
    }).then((result: any)=>{
      if(result.value){
        this._authService.adminLogout();
        this._router.navigate(['/auth/login']);
        this._toastrService.success('Logout successfully');
      }
    })
  }

}
