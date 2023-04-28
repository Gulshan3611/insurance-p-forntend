import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ProjectService, InvoiceService, AuthService } from '../../../_services';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FlatpickrOptions } from 'ng2-flatpickr';
// import locale from 'date-fns/locale/en-US';
import * as moment from 'moment';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss']
})
export class AddInvoiceComponent implements OnInit {

  loading: boolean = false;
  showError: boolean = false;
  apiCalled: boolean = false;
  submitted = false;
  addInvoice: any = {};
  currentDate: any = new Date();
  percentageValue: any;
  gstCountry: any;
  milestone: any;
  dueDateData: any;

  venderList: any;

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
    private _invoiceService: InvoiceService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit(): void { 
    this.getVendorListFromApi()
    
    const getRandomId = (min = 0, max = 500000) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      const num =  Math.floor(Math.random() * (max - min + 1)) + min;
      return num.toString().padStart(10, "0")
    };

    this.addInvoice.InvoiceNumber = getRandomId();
  }

  getVendorListFromApi() {
    this.apiCalled = false;
    this._invoiceService.getVendorLists().subscribe(objS => {
      this.apiCalled = true;
        this.venderList = objS;
        // console.log(this.venderList)
    }, (err) => {
      console.log(err);
    })
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
    console.log(event.target.value)
    console.log(moment.parseZone(event.target.value).add(15, 'days').format())
    this.addInvoice.invoiceDueDate = moment.parseZone(event.target.value).add(15, 'days').format()
    // 2023-04-26T18:30:00.000Z

    this.dueDateData = moment.parseZone(event.target.value).add(15, 'days').format('YYYY-MM-DD')
  }

  onSubmit(valid: any): void {
    this.showError = true;
    this.submitted = true;
    // console.log('checking---', valid, this.resource)
    if (valid) {
      this.loading = true;
      console.log(this.addInvoice)
      if(this.addInvoice.cgst > 101 ) {
        this.toastr.error('The percentage must be between 0 and 100');
        return;
      }
    }
  }

}
