import { Injectable } from '@angular/core';
import * as moment from 'moment';
// import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthService {
    isLoggedIn() {
      throw new Error("Method not implemented.");
    }

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) { }

    setDataAdmin(data: any) {
        localStorage.setItem('go_d_r_a', JSON.stringify(data)); //This is use for admin data
    }

    setTokenAdmin(token: string) {
        localStorage.setItem('go_d_r_a_t', token); //This is use for admin token
    }

    getAdminData() {
        return JSON.parse(localStorage.getItem('go_d_r_a') || '{}');
    }

    getTokenAdmin() {
        return localStorage.getItem('go_d_r_a_t');
    }

    isLoggedInAdmin() {
        return this.getTokenAdmin() !== null;
    }

    isCheckPermission() {
        var createdAt;
        var companyDetails = this.getAdminData();

        var currentDate = moment();
        var days = currentDate.diff(createdAt, 'days');
        if (days > 15 && companyDetails.type == 'superadmin') {
            // this.isCheckSubscription();
            // console.log('days-----===>>',days)
            if (days > 15) {
                return false;
            } else {
                return false;
            }
        } else {
            if (companyDetails.role) {
                return companyDetails.role;
            } else {
                return true;
            }
        }
    }

    checkAccess(moduleId: any, type: any) {
        var data = this.getAdminData().role;
        var loginDetails = this.getAdminData();
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
   
    adminLogout() {
        localStorage.removeItem('go_d_r_a_t');
        localStorage.removeItem('go_d_r_a');
        
    }
}
