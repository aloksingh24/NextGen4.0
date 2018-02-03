import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { ServicesService } from '../../services.service';

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

  constructor(private authService: ServicesService) {
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

}





