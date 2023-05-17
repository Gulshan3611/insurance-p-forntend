import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ProjectService, VendorService, AuthService, ResourceService } from '../../../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';
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
    projectType: ''
  };
  vendorListLength: any = [];
  vendorList: any = {}
  resourceList: any = {}
  currentDate: any = new Date();
  percentageValue: any;
  projectTypeForApi: any;
  monthlyHourly: any;
  slectedProjectType = '';
  milestone: any;

  deliveryDate: FlatpickrOptions = {
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
      this.addProject.deliveryDate = selectedDates.toString();
    },
  };

  milestones: any[] = [{
    title: '',
    month: '',
    totalAmount: '',
    discount: '',
    decidedHours: '',
    investedHours: '0',
    payableAmount: '',
    milestoneName: '',
    monthlyprice: '',
    hourlyprice: '',
    technology: '',
    experience: '',
    duration: '',
    milestoneAmount: '',
    timeline: '',
    deliveryDate2: '',
    projectPercentage: '',
    milestoneNumber: '',
  }];
  milestoneAdded = false;
  showDeleteButton = false;

  deliveryDate2: FlatpickrOptions = {
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
      this.milestones[0].deliveryDate2 = selectedDates.toString();
    },
  };

  constructor(
    private _projectService: ProjectService,
    private _toastrService: ToastrService,
    private router: Router,
    private _vendorService: VendorService,
    private _ResourceService: ResourceService,
    private activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit(): void {
    this.getVendorLists_f()
    this.getResourceLists_f()
  }

  checkpermission(value: any, type: any) {
    return this._authService.checkAccess(value, type)
  }

  getResourceLists_f() {
    this.apiCalled = false;
    this._ResourceService.getResourceLists({
      page: 1,
      limit: 100,
      searchBy: '',
    }).subscribe(objS => {
      this.loading = this.showError = false;
      if (objS?.docs?.length != 0) {
        this.apiCalled = true;
        this.resourceList = objS.docs
        // console.log('print response====Resource',objS.docs.length, this.ResourceList)
      } else {
        this.resourceList = []
        // this._toastrService.error(objS.message);
      }
    }, (err) => {
      this.loading = this.showError = false;
      console.log('err', err)
    });
  }

  getVendorLists_f() {
    this.apiCalled = false;
    this._vendorService.getVendorLists({
      page: 1,
      limit: 100,
      searchBy: '',
    }).subscribe(objS => {
      this.loading = this.showError = false;
      if (objS?.docs?.length != 0) {
        this.apiCalled = true;
        this.vendorList = objS.docs;
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
    if (this.slectedProjectType == "FIXED") {
      this.projectTypeForApi = "fixed"
    }
    if (this.slectedProjectType == "RESOURCEONMONTHLY") {
      this.projectTypeForApi = "resourceOnMonthly";
      // this.monthlyHourly = "Hours"
    }
    if (this.slectedProjectType == "PROJECTONMONTHLY") {
      this.projectTypeForApi = "projectOnMonthly"
    }
    if (this.slectedProjectType == "RESOUCEONHOURLY") {
      this.projectTypeForApi = "resourceOnHourly"
    }
    console.log('Project type changed:', event);
  }
 

  onKeyPress(event: any) {
    const pattern = /[0-9]/; // Regular expression to match numbers only
    const inputChar = String.fromCharCode(event.charCode); // Get the input character
    if (!pattern.test(inputChar)) { // If the input is not a number, prevent it
      event.preventDefault();
    }
  }
  onInput(event: any) {
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9]/g, ''); // Remove non-numeric characters
  }
  // define a function to calculate payable amount based on total amount and discount
  // calculatePayableAmount(totalAmount: number, discount: number): number {
  //   const payableAmount = totalAmount - discount;
  //   return payableAmount >= 0 ? payableAmount : 0;
  // }
  
  addMilestone() {
    if (this.slectedProjectType == "PROJECTONMONTHLY") {
      this.milestone = {
        title: '',
        month: '',
        totalAmount: '',
        discount: '',
        decidedHours: '',
        investedHours: '0',
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
        // totalAmount: '',
        milestoneName: '',
        // title: '',
        // month: '',
        milestoneAmount: '',
        timeline: '',
        deliveryDate: '',
        projectPercentage: '',
        // milestoneNumber: '',
      };
    }
    if (this.slectedProjectType == "") {
      this._toastrService.info("Please select a project type");
      return
    }
    if (this.slectedProjectType == "RESOURCEONMONTHLY" || this.slectedProjectType == "RESOUCEONHOURLY") {
      // let totalNoOfRes = this.milestones.reduce((accumulator, item) => {
      //   return accumulator + +item?.duration;
      // }, 0);
      if (!this.addProject?.numberOfResource) {
        this._toastrService.info("Please enter a number of resources");
        return
      }
      if ((this.milestones.length) + 1 <= this.addProject?.numberOfResource) {
      } else {
        this._toastrService.info("if you want to add some more resource then you need to change first number of resource");
        return
      }

    }

    this.milestones.push(this.milestone);

    // this.milestones.push({});
    this.milestoneAdded = true;
    // console.log(this.milestones);
  }

  handleChangeDiscount(event: any,i:any) {
    // this.value = event.target.value;
    // console.log(this.value);
    console.log(i,"kkkkkkkkkkkkkkkk",this.milestones[i]?.totalAmount,"discount",this.milestones[i]?.discount);
  }
 
  handleChange(event: any,i:any) {
    // this.value = event.target.value;
    // console.log(this.value);
    if (this.milestones[i]?.payableAmount != null) {
      this.milestones[i].payableAmount = this.milestones[i].totalAmount - this.milestones[i].discount;
    }
    // this.milestones[i]?.payableAmount = this.milestones[i]?.totalAmount - this.milestones[i]?.discount
    // console.log(i,"kkkkkkkkkkkkkkkk",this.milestones[i]?.totalAmount,"discount",this.milestones[i]?.discount);
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

    // this.milestones.deliveryDate = moment(this.deliveryDate.deliveryDate).format()
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

    if (this.slectedProjectType == "PROJECTONMONTHLY") {
      // if (!this.addProject?.numberOfResource) {
      //   this._toastrService.info("Please enter a number of resources");
      //   return
      // }
      let totalDecidedHourss = this.milestones.reduce((accumulator, item) => {
        return accumulator + +item?.decidedHours;
      }, 0);
      if (totalDecidedHourss == this.addProject?.totalHours) {
      } else {
        this._toastrService.info("Decided Hours should be equal to project total Hours " + this.addProject?.totalHours);
        return
      }

    }

    let newData = []
    if (this.slectedProjectType == "FIXED") {
      if (this.addProject?.deliveryDate) {
        this.addProject.deliveryDate = moment(this.addProject?.deliveryDate[0]).format()
      }
      let totalPrice = this.milestones.reduce((accumulator, item) => {
        return accumulator + +item?.milestoneAmount;
      }, 0);
      let TotalProjectPrecent = this.milestones.reduce((accumulator, item) => {
        return accumulator + +item?.projectPercentage;
      }, 0);

      if (this.milestone?.deliveryDate2) {
        newData = this.milestones.map(obj => {
          // Copy the original object
          const newObj = { ...obj };
          // Rename the `deliveryDate2` property to `deliveryDate`
          newObj.deliveryDate = newObj?.deliveryDate2;
          delete newObj?.deliveryDate2;

          return newObj;
        });
      }

      if (totalPrice == this.addProject?.amount) {
      } else {
        this._toastrService.info("milestone amount should be equal to project amount " + this.addProject?.amount);
        return
      }
      if (TotalProjectPrecent == 100) {
      } else {
        this._toastrService.info("Project percentage should be 100% ");
        return
      }
    } else {
      newData = filteredData
    }

    if (this.slectedProjectType == "RESOURCEONMONTHLY" || this.slectedProjectType == "RESOUCEONHOURLY") {
      let totalDuration = this.milestones.reduce((accumulator, item) => {
        return accumulator + +item?.duration;
      }, 0);
      if (totalDuration == this.addProject?.contractDuration) {
      } else {
        this._toastrService.info("Durations should be equal to project Duration " + this.addProject?.contractDuration);
        return
      }

    }

    let requestData = {
      vendorId: this.addProject?.vendorId,
      projectType: this.addProject?.projectType,
      projectName: this.addProject?.projectName,
      totalHours: this.addProject?.totalHours,
      monthlyCharge: this.addProject?.monthlyCharge,
      currency: this.addProject?.currency,
      contractDuration: this.addProject?.contractDuration,
      amount: this.addProject?.amount,
      timeline: this.addProject?.timeline,
      deliveryDate: this.addProject?.deliveryDate,
      [this.projectTypeForApi]:
        newData
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
          this.router.navigate(['/project-management/list']);
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
