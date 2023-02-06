import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ProjectService, RoleService, AuthService } from '../../../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FlatpickrOptions } from 'ng2-flatpickr';
// import locale from 'date-fns/locale/en-US';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent implements OnInit {

  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;
  submitted = false;
  addInvoice: any = {};
  currentDate: any = new Date();
  percentageValue: any;
  gstCountry: any;
  milestone: any;

  addMilestone: any = [{
    milestoneName: "",
    paymentPercentage: "",
    project_amount: '',
    payable_amount: ''
  }];

  addMilestone1: any = [{
    description: "",
    month: "",
    monthly_amount: '',
    payable_amount: ''
  }];

  invoiceDate: FlatpickrOptions = {
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
    // onChange: (selectedDates: any) => {
    //   this.addInvoice.date = selectedDates.toString();
    //   console.log(this.addInvoice.date)
    // },
  };

  invoiceDueDate: FlatpickrOptions = {
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
      this.addInvoice.date = selectedDates.toString();
    },
  };

  month: FlatpickrOptions = {
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
      this.addInvoice.date = selectedDates.toString();
    },
  };

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

  add() {
    this.addMilestone.push({
      milestoneName: "",
      paymentPercentage: "",
      project_amount: "",
      payable_amount: ""
    });
  }

  remove(index: any) {
    if (this.addMilestone.length > 1) {
      this.addMilestone.splice(index, 1);
    }
  }

  item() {
    this.addMilestone1.push({
      description: "",
      month: "",
      monthly_amount: "",
      payable_amount: ""
    });
  }

  removeItem(index: any) {
    if (this.addMilestone1.length > 1) {
      this.addMilestone1.splice(index, 1);
    }
  }

  percentageChange(event: any) {
    console.log(event.target.value)
    this.gstCountry = event.target.value;
  }

  selectItem(event: any) {
    this.milestone = event;
    // console.log(event)
  }

  selectedDates(event: any){
    // moment.parseZone(event)
    console.log(moment.parseZone(event.target.value).add(15, 'days').format())
    this.addInvoice.clientName = moment.parseZone(event.target.value).add(15, 'days').format('YYYY/MM/DD')
  }

  onSubmit(valid: any): void {
    this.showError = true;
    this.submitted = true;
    // console.log('checking---', valid, this.resource)
    if (valid) {
      this.loading = true;
    }
  }

}
