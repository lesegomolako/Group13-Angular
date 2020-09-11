import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../../API Services/for Supplier/supplier.service';
import { SupplierData } from '../../../API Services/for Supplier/sales';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-editsupplier',
  templateUrl: './editsupplier.component.html',
  styleUrls: ['./editsupplier.component.css']
})
export class EditsupplierComponent implements OnInit {

  constructor( private router: Router,private formBuilder: FormBuilder, private service: SupplierService) { }
  supplier: SupplierData;
  EditForm: FormGroup;


  ngOnInit(): void {
    
    this.supplier= JSON.parse(localStorage.getItem('supplier'));
    this.EditForm = this.formBuilder.group({
      supplierid: [this.supplier.SupplierID],
      name: [this.supplier.Name, Validators.required],
      contactno: [this.supplier.ContactNo,[ Validators.required, Validators.maxLength(10),Validators.minLength(10)]],
      email: [this.supplier.Email,[ Validators.required, Validators.email]],
      address: [this.supplier.Address, Validators.required]
    })
  }
  EditSupp(supplier)
  {
    console.log(supplier.value)
    this.service.EditSupplier(supplier.value)
    .subscribe(res => {
      if (res == "success")
      {
        alert("Successfully Updated")
        this.router.navigateByUrl("/supplier")
      }
    })
  }
  
}
 // OnSubmit()
// {
//   console.log(this.EditForm.value);
//   this.supplier = Object.assign(this.supplier, this.EditForm.value);
  
// }
