
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SalesUserAdd } from '../models/Salesuseradd';
import { UserService } from '../Services/user.service';
import { Product } from '../models/Products';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [CommonModule,ReactiveFormsModule],
})
export class AdminComponent {
  users : SalesUserAdd[] = [];
  products : Product[] = [];
  user:any;
  isProductAdded : boolean = false;
  isPrductAddedError : boolean = false;
  showallUser:boolean =false;
  userDoesNotExist : boolean = false;
  DeleteuserDoesNotExist : boolean = false;
  isAdded : boolean = false;
  salesFromError : boolean = false;
  UserExist : boolean = false;
  DeleteUserExist : boolean = false;
  showSalesFormFlag = false;
  showPurchaseFormFlag = false;
  showUserByIdFlag = false;
  showDeleteUserFlag = false;
  showAddProductFlag = false;
  showProductByIdFlag = false;
  showAllProductsFlag = false;
  showUpdateProductFlag = false;
  showDeleteProductFlag = false;

  SalesFormGroup =  new FormGroup({
    EmployeeID : new FormControl("",[Validators.minLength(1),Validators.required]),
    EmployeeName :new FormControl("",[Validators.minLength(3),Validators.required]) ,
    Username : new FormControl("",[Validators.minLength(3),Validators.required]),
    Password : new FormControl("",[Validators.minLength(3),Validators.required]),
    Role : new FormControl("",[Validators.minLength(3),Validators.required])
  })


  ProductFormGroup =  new FormGroup({
    id : new FormControl("",[Validators.minLength(1),Validators.required]),
    name :new FormControl("",[Validators.minLength(3),Validators.required]) ,
    price : new FormControl("",[Validators.minLength(3),Validators.required]),
    stock : new FormControl("",[Validators.minLength(3),Validators.required]),
   
  })

  SeeUserBYID =  new FormGroup({
    userid : new FormControl("",[Validators.minLength(1),Validators.required]),

  })

  DeleteUserBYID =  new FormGroup({
    userid : new FormControl("",[Validators.minLength(1),Validators.required]),

  })


  /**
   *
   */
  constructor(private userService: UserService) {
    this.isAdded = false;
    this.salesFromError =  false;
    this.userDoesNotExist = false;
    this.UserExist = false;
    this.DeleteuserDoesNotExist = false;
    this.DeleteUserExist = false;
    this.isProductAdded = false;
    this.isPrductAddedError = false;
  }

  AddProductSubmit(){
   let Product : Product = {
     id : parseInt(this.ProductFormGroup.get('id')?.value as string),
     name : this.ProductFormGroup.get('name')?.value as string,
     price : parseFloat(this.ProductFormGroup.get('price')?.value as string),
     stock : parseInt(this.ProductFormGroup.get('stock')?.value as string)
   } 

   this.userService.AddProduct(Product).subscribe((response:any)=>{
     console.log(response);  this.isProductAdded = false;
     this.isPrductAddedError = false;
     this.isProductAdded = true;
   },(err)=>{
    this.isPrductAddedError = true;
    this.isProductAdded = false;
     console.error(err);
   });
  }

  SalesFormSubmit(){
    this.showallUser = false;
    let SalesPerson :SalesUserAdd ={
      //id : 0,
      employeeId : this.SalesFormGroup.get('EmployeeID')?.value as string,
      employeeName : this.SalesFormGroup.get('EmployeeName')?.value as string,
      username : this.SalesFormGroup.get('Username')?.value as string,
      password : this.SalesFormGroup.get('Password')?.value as string,
      role : this.SalesFormGroup.get('Role')?.value as string
    }

    this.userService.AddSalesPerson(SalesPerson).subscribe((response:any)=>{
      this.isAdded =true;
      console.log(response);
    },(err)=>{
      this.salesFromError = true;
      console.log(err);     
    });
    
  }


  ShowAllUser(){
      this.showallUser = true;
      this.userService.ShowAllUsers().subscribe((response:any)=>{
        this.users = response;
        console.log(this.users);
        

      },(err)=>{
        console.error(err);
      })
  }


  



  DeleteUserByID(){
    let id = this.DeleteUserBYID.get('userid')?.value as string;
    this.userService.DeleteUser(id).subscribe((response:any)=>{
      this.DeleteUserExist = true;
   
      this.DeleteuserDoesNotExist = false;
      console.log(response);
      

    },(err)=>{
      this.DeleteuserDoesNotExist = true;
      this.DeleteUserExist = false;
      console.error(err);
    });
  }

  showSalesForm() {
    this.showallUser = false;
    this.resetFlags();
    this.showSalesFormFlag = true;
  }

  showPurchaseForm() {
    this.showallUser = false;
    this.resetFlags();
    this.showPurchaseFormFlag = true;
  }

  showUserByIdForm() {
    this.showallUser = false;
    this.resetFlags();
    this.showUserByIdFlag = true;


  }

  SeeUserByID(){
    let id = this.SeeUserBYID.get('userid')?.value as string;
    this.userService.SeeUserById(id).subscribe((response:any)=>{
      this.UserExist = true;
      this.user = response;
      this.userDoesNotExist = false;
      console.log(response);
      

    },(err)=>{
      this.userDoesNotExist = true;
      this.UserExist = false;
      console.error(err);
    });
  }

  showDeleteUserForm() {
    this.showallUser = false;
    this.resetFlags();
    this.showDeleteUserFlag = true;
  }

  showAddProductForm() {
    this.showallUser = false;
    this.resetFlags();
    this.showAddProductFlag = true;
  }

  showProductByIdForm() {
    this.showallUser = false;
    this.resetFlags();
    this.showProductByIdFlag = true;
  }

  showAllProducts() {
    this.showallUser = false;
    this.resetFlags();
    this.showAllProductsFlag = true;

    this.userService.SeeAllProducts().subscribe((response:any)=>{
      this.products = response;
      console.log(this.products);
    },
    (err:any)=>{
      console.error(err);
    })
  }

  showUpdateProductForm() {
    this.showallUser = false;
    this.resetFlags();
    this.showUpdateProductFlag = true;
  }

  showDeleteProductForm() {
    this.showallUser = false;
    this.resetFlags();
    this.showDeleteProductFlag = true;
  }

  resetFlags() {
    this.showallUser = false;
    this.showSalesFormFlag = false;
    this.showPurchaseFormFlag = false;
    this.showUserByIdFlag = false;
    this.showDeleteUserFlag = false;
    this.showAddProductFlag = false;
    this.showProductByIdFlag = false;
    this.showAllProductsFlag = false;
    this.showUpdateProductFlag = false;
    this.showDeleteProductFlag = false;
  }
}
