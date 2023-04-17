import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router'
import { AdminService, AuthService, updateHeaderService } from '../../_services';
import { environment} from '../../../environments/environment'
import { SidebarService } from '../../_services';

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
    public _sidebarService: SidebarService,
    private _header: updateHeaderService
  ) { }

  ngOnInit(): void {
     this.refreshToken = localStorage.getItem('go_d_r_a_t');
    console.log(this.refreshToken.refresh);
    
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

  logout(data: any) {
    this._adminService.logOut(data.id);
    this._authService.adminLogout();
    this._router.navigate(['/auth/login']);
  }

}
