import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ProjectService, RoleService, AuthService } from '../../../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FlatpickrOptions } from 'ng2-flatpickr';
// import locale from 'date-fns/locale/en-US';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;
  submitted = false;
  addProject: any = {};
  currentDate: any = new Date();
  percentageValue: any;

  dateOptions: FlatpickrOptions = {
    // locale: locale, // date-fns locale,
    format: 'LLLL do yyyy', // date format to display in input
    formatTitle: 'LLLL yyyy',
    formatDays: 'EEEEE',
    // mode: 'range',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    position: 'bottom',
    inputClass: '', // custom input CSS class to be applied
    calendarClass: 'datepicker-default', // custom datepicker calendar CSS class to be applied
    scrollBarColor: '#dfe3e9', // in case you customize you theme, here you define scroll bar color
    minDate: this.currentDate,
    onChange: (selectedDates: any) => {
      this.addProject.date = selectedDates.toString();
    },
  };
  milestones: any[] = [{}];
  milestoneAdded = false;
  showDeleteButton = false;


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

  percentageChange(event: any) {
    console.log(event.target.value)
    this.percentageValue = event.target.value;
  }

  addMilestone() {
    this.milestones.push({});
    this.milestoneAdded = true;
    console.log(this.milestones);
  }
  


  onAddButtonClick() {
    this.showDeleteButton = true;
    // code to add fields here
  }

  onDeleteButtonClick() {
    this.showDeleteButton = false;
    // code to delete fields here
  }
  

  onSubmit(valid: any): void {
    this.showError = true;
    this.submitted = true;
    // console.log('checking---', valid, this.resource)
    if (valid) {
      this.loading = true;
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
