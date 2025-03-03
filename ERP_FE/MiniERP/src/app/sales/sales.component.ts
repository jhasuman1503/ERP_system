
import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer } from '../models/Customer';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-sales',
  standalone: true,
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
  imports: [CommonModule, ReactiveFormsModule,NgIf],
})
export class SalesComponent {
  Name = '';
  Email = '';
  Phone = '';
  CustomerId: number = 0;
  customerId: number = 0;
  totalAmount: number = 0;
  IsCustomerAdded : boolean = false;
  IsCustomerAddedError : boolean = false;
  IsCustomerDelete : boolean = false;
  IsCustomerDeleteError : boolean = false;
  showForm = false;
  showIdForm = false;
  showDeleteForm = false;
  showSalesOrder = false;
  showAllSalesOrders = false;
  Customers : Customer[] = [];
  ShowAllCustomer: boolean = false;

  /**
   *
   */
  constructor(private userServices : UserService) {
   this.IsCustomerAdded = false;
   this.IsCustomerAddedError = false;
   this.ShowAllCustomer = false;
   this.IsCustomerDelete =false;
   this.IsCustomerDeleteError = false;
  }

  DeleteUserBYID =  new FormGroup({
    userid : new FormControl("",[Validators.minLength(1),Validators.required]),

  })
    SalesCustomerForm =  new FormGroup({
     // id : new FormControl("",[Validators.minLength(1),Validators.required]),
      Name :new FormControl("",[Validators.minLength(3),Validators.required]) ,
      Email : new FormControl("",[Validators.minLength(3),Validators.required]),
      Phone : new FormControl("",[Validators.minLength(3),Validators.required]),
     
    })
  
    SalesCustomerFormSubmit(){
      this.ShowAllCustomer = false;
    
      let SalesCustomer  : Customer ={
        name : this.SalesCustomerForm.get('Name')?.value as string,
        email : this.SalesCustomerForm.get('Email')?.value as string,
        phone : this.SalesCustomerForm.get('Phone')?.value as string,
      }

      this.userServices.AddSalesaCustomer(SalesCustomer).subscribe((res:any)=>{
        this.IsCustomerAdded = true;
        this.IsCustomerAddedError = false;
        console.log(res);
      },(err)=>{
        this.IsCustomerAdded = false;
        this.IsCustomerAddedError = true;
        console.log(err);
        
      })
      
    }
  toggleForm() {
    this.ShowAllCustomer = false;
    
    this.showForm = !this.showForm;
    this.resetForms('showForm');
  }

  toggleIdForm() {
    this.ShowAllCustomer = false;
    
    this.showIdForm = !this.showIdForm;
    this.resetForms('showIdForm');
  }

  deleteCustomerForm() {
    this.ShowAllCustomer = false;
    
    this.showDeleteForm = !this.showDeleteForm;
    this.resetForms('showDeleteForm');
  }

  showSalesOrderForm() {
    this.ShowAllCustomer = false;
    
    this.showSalesOrder = !this.showSalesOrder;
    this.resetForms('showSalesOrder');
  }

  viewAllSalesOrders() {
    this.ShowAllCustomer = false;
    
    this.showAllSalesOrders = !this.showAllSalesOrders;
    this.resetForms('showAllSalesOrders');
  }

  submitCustomer() {
    this.ShowAllCustomer = false;
    
    console.log('Customer Submitted:', this.Name, this.Email, this.Phone);
    window.location.reload();
  }
  SeeUserByID(){
   // let id = this.SeeUserBYID.get('userid')?.value as string;
  }

  DeleteUserByID(){
    let id = this.DeleteUserBYID.get('userid')?.value as string;
    this.userServices.DeleteCustomerByID(id).subscribe((response:any)=>{
      this.IsCustomerDelete =true;
      this.IsCustomerDeleteError = false;
      console.log(response);
    },(err)=>{
      this.IsCustomerDelete =false;
      this.IsCustomerDeleteError = true;
      console.error(err);
    });

  }
  seeCustomerById() {
    this.ShowAllCustomer = false;
    
    console.log('Customer By ID:', this.CustomerId);
    window.location.reload();
  }

  deleteCustomer() {
    this.ShowAllCustomer = false;
    
    console.log('Customer Deleted:', this.CustomerId);
    window.location.reload();
  }

  createSalesOrder() {
    this.ShowAllCustomer = false;
    
    console.log('Sales Order Created:', this.customerId, this.totalAmount);
    window.location.reload();
  }

  seeAllCustomers() {
    this.ShowAllCustomer = true;
    
    console.log('See All Customers');
    
    this.userServices.SeeAllCustomers().subscribe((response:any)=>{
      this.Customers = response;
      console.log(response);
    },(err:any)=>{
      console.error(err);
    })
  }
 
  resetForms(currentForm: string) {
    this.showForm = currentForm === 'showForm' ? this.showForm : false;
    this.showIdForm = currentForm === 'showIdForm' ? this.showIdForm : false;
    this.showDeleteForm = currentForm === 'showDeleteForm' ? this.showDeleteForm : false;
    this.showSalesOrder = currentForm === 'showSalesOrder' ? this.showSalesOrder : false;
    this.showAllSalesOrders = currentForm === 'showAllSalesOrders' ? this.showAllSalesOrders : false;
  }
}
