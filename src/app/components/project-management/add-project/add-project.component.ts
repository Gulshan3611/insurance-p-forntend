import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ProjectService, VendorService, AuthService } from '../../../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { NgxSpinnerService } from "ngx-spinner";
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
  addProject: any = {
    projectType: 'RESOUCEONHOURLY'
  };
  vendorListLength: any = [];
  vendorList: any = {}
  currentDate: any = new Date();
  percentageValue: any;
  slectedProjectType = 'RESOUCEONHOURLY';
  milestone: any;

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
  milestones: any[] = [{
    title: '',
    month: '',
    totalAmount: '',
    discount: '',
    decidedHours: '',
    investedHours: '',
    payableAmount: '',
    milestoneName: '',
    monthlyprice: '',
    hourlyprice: '',
    technology: '',
    experience: '',
    duration: '',
    milestoneAmount: '',
    timeline: '',
    deliveryDate: '',
    projectPercentage: '',
    milestoneNumber: '',
  }];
  milestoneAdded = false;
  showDeleteButton = false;


  constructor(
    private _projectService: ProjectService,
    private _toastrService: ToastrService,
    private router: Router,
    private _vendorService: VendorService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit(): void {
    this.getVendorLists_f()
  }
  getVendorLists_f(){
    this.apiCalled = false;
    this._vendorService.getVendorLists({
      page: 1,
      limit: 100,
      searchBy: '',
    }).subscribe(objS => {
      this.loading = this.showError = false;
      if (objS?.docs?.length !=0) {
        this.apiCalled = true;
        this.vendorList = objS.docs
        this.vendorListLength = objS.docs;
        // console.log('print response====vendor',objS.docs.length, this.vendorList)
      } else {
        this.vendorList = []
        this.vendorListLength = [];
        // this._toastrService.error(objS.message);
      }
    }, (err) => {
      this.loading = this.showError = false;
      console.log('err', err)
    });
  }

  percentageChange(event: any) {
    console.log(event.target.value)
    this.percentageValue = event.target.value;
  }
  onProjectTypeChange(event: any) {
    this.slectedProjectType = event;
    console.log('Project type changed:', event);
  }

  addMilestone() {
    if (this.slectedProjectType == "PROJECTONMONTHLY") {
      this.milestone = {
        title: '',
        month: '',
        totalAmount: '',
        discount: '',
        decidedHours: '',
        investedHours: '',
        payableAmount: '',
      };
    }
    if (this.slectedProjectType == "RESOURCEONMONTHLY") {
      this.milestone = {
        monthlyprice: '',
        technology: '',
        experience: '',
        duration: '',
      };
    }
    if (this.slectedProjectType == "RESOUCEONHOURLY") {
      this.milestone = {
        hourlyprice: '',
        technology: '',
        experience: '',
        duration: '',
      };
    }
    if (this.slectedProjectType == "FIXED") {
      this.milestone = {
        totalAmount: '',
        milestoneName: '',
        title: '',
        month: '',
        milestoneAmount: '',
        timeline: '',
        deliveryDate: '',
        projectPercentage: '',
        milestoneNumber: '',
      };
    }
    this.milestones.push(this.milestone);
    // this.milestones.push({});
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
    console.log('checking---', valid, this.addProject, this.milestones)

    const filteredData = this.milestones.map(obj => {
      const newObj = {};
      for (const [key, value] of Object.entries(obj)) {
        if (value !== "" || !["milestoneAmount", "timeline", "deliveryDate", "projectPercentage",
          "milestoneNumber", "title", "month", "totalAmount", "discount", "decidedHours",
          "investedHours", "payableAmount", "milestoneName", "monthlyprice", "hourlyprice", "technology",
          "experience", "duration"].includes(key)) {
          newObj[key] = value;
        }
      }
      return newObj;
    });

    let requestData = {
      vendorId: "6427d0641d0a8742b02c7d3a",
      projectType: this.addProject?.projectType,
      projectName: this.addProject?.projectName,
      totalHours: this.addProject?.totalHours,
      monthlyCharge: this.addProject?.monthlyCharge,
      currency: this.addProject?.currency,
      contractDuration: this.addProject?.contractDuration,
      projectMonthly:
        filteredData

    }
    // const convertedData = this.milestones.map(item => ({
    //   permissions: Object.keys(item).filter(key => key !== 'moduleName' && key !== 'moduleId'),
    //   moduleName: item.moduleName,
    //   moduleId: item.moduleId
    // }));
    if (valid) {
      this.loading = true;
      // const result = { "name" : this.roleForm.name ,"resource": convertedData };
      // console.log("result",result);
      // return
      this.loading = true;
      this.spinner.show();
      // call api

      this._projectService.addProject(requestData).subscribe(objS => {
        console.log('print response====', objS)
        this.loading = this.showError = false;
        if (objS.code == 200) {
          // this._authService.setDataAdmin(objS.data);
          this.spinner.hide();
          this._toastrService.success(objS.message);
          // this._header.checkFunction(true);
          this.router.navigate(['/role-management/list']);
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
