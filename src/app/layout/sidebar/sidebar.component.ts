import { Component, OnInit } from '@angular/core';
import { SidebarService, AuthService, StaffService } from "../../_services";
import { ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  userType: any = "";
  public pathname: any;
  url: any;
  currentRoute: string;
  profile: any;
  staffId: any;
  staffDetail: any = {};

  constructor(
    public _sidebarService: SidebarService,
    private route: ActivatedRoute,
    private router: Router,
    private _authService: AuthService,
    private _staffService: StaffService
  ) {

    this.currentRoute = "";
    this.router.events.subscribe((event: Event) => {

      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        this.url = event.url;
      }
    });

    var detail = this._authService.getAdminData()
    this.staffId = detail.id

    this._staffService.staffMember(this.staffId).subscribe((res) => {
      if (res.code == 200) {
        if (res['data']) {
          this.staffDetail = res['data'];
          console.log('-----------------',this.staffDetail )
          localStorage.setItem('go_d_r_a', JSON.stringify(res['data']))
        }
      }
    }, (err) => {
      console.log('Error while Login', err);
    })
  }

  ngOnInit(): void {
    this.profile = this._authService.getAdminData();
  }

  // status: boolean = false;
  menuBtn() {
    this._sidebarService.IsSideBarShow = !this._sidebarService.IsSideBarShow;
  }

  checkAccess(moduleId: any, type: any) {
    // console.log(moduleId, type)
    var data = this._authService.getAdminData().role;
    var loginDetails = this._authService.getAdminData();
    // console.log('data-----===>>122==', data)
    if (data && loginDetails.type != 'superadmin') {
      for (let i = 0; i < data.resource.length; i++) {
        if (data.resource[i].moduleId == moduleId) {
          return data.resource[i].permissions.includes(type) ? true : false
        }
      }
    } else {
      return true;
    }
  }

}
