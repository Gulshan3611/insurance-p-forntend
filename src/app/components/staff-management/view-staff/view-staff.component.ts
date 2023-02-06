import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { StaffService, RoleService, AuthService } from '../../../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-staff',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.scss']
})
export class ViewStaffComponent implements OnInit {

  isShow: any = false;
  isDisabled: any = false;
  submitted = false;
  public isButton: boolean = false;
  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;
  roleList: any = [];
  staffForm: any = {
    status: "1",
    role: "",
    type: "admin"
  };
  
  constructor(
    private _staffService: StaffService,
    private toastr: ToastrService,
    private _router: Router,
    private _roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    // private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
  }

}
