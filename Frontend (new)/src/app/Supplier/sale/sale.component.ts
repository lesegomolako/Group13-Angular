import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
//import { StockDataSource, StockItem } from './stock-datasource';
import { SaleService } from '../../API Services/for Supplier/sale.service';
import { SaleData } from '../../API Services/for Supplier/sales';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
//import { ReportingService } from '../../API Services/for User/reporting.service';
//import {Process} from '../../API Services/for User/process';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})



export class SaleComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<SaleData>;

  value = 'Clear me';

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['saleid', 'saletype' ,'status', 'client' , 'payment' ,'paymenttype', 'date', 'reminder', 'viewdetail'];
  dialog: any;
  searchKey: string;
  SaleData: any;
  

  constructor(public service: SaleService, private router: Router){}

  SaleList: SaleData[];
  dataSource = new MatTableDataSource(this.SaleList)
  sale;
  

  ngOnInit(): void {
    this.service.getSaleList().subscribe(res => 
      {
        this.SaleList = res;
        this.dataSource.data = this.SaleList;
      })

      
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator= this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onCreate(){
    this.dialog.open(SaleComponent)
  }

  onSearchClear() {
    this.searchKey = "";
    //this.applyFilter();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ViewDetails(SaleData)
{
  //this.service.stocksData = form;
  localStorage.setItem('sale', JSON.stringify(SaleData))
  this.router.navigateByUrl("/viewdetail")
}

  
  
}

  



  
