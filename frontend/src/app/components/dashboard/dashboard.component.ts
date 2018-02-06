import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { ServicesService } from '../../services.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  displayedColumns = ['id', 'employeeNumber', 'employeeName', 'employeeDesignation', 'employeeServiceLine', 'employeeRole'];
  dataSource: any;
  data: string;
  ELEMENT_DATA: any;
  loading = true;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private authService: ServicesService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) {
    this.authService.getDashboardData()
    .subscribe(data => {
      if (data) {


        setTimeout(() => {
          this.ELEMENT_DATA = data;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.dataSource.data = this.dataSource.data.map(function(val, i){
            val.id = i + 1;
            return val;
          });
          this.loading = false;
                  // for sorting
        this.dataSource.sort = this.sort;
        // for pagination
        this.dataSource.paginator = this.paginator;
        }, 3000);

      } else {
        console.log('error');
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onLogOut(){
    this.authService.logout();
    this.flashMessagesService.show('You are logged out',{cssClass: 'alert-info'} );
    this.router.navigate(['/login']);
  }

}
