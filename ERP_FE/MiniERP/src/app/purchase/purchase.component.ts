import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { Supplier } from '../models/Supplier';

@Component({
  selector: 'app-purchase',
  standalone: true,
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
  imports: [CommonModule, FormsModule,ReactiveFormsModule]
})
export class PurchaseComponent {
  supplierAdded : boolean = false;
  supplierAddedError : boolean = false;
  supplierDeleted : boolean = false;
  supplierDeletedError : boolean = false;
  UpdateSupplier : boolean = false;
  UpdateSupplierError : boolean = false;
  formVisible = false;
  updateFormVisible = false;
  deleteFormVisible = false; 
  supplierName = '';
  supplierContact = '';
  supplierId = ''; 
  suppliers: Supplier[] = [];
  ShowAllSupplier  :boolean = false;

  /**
   *
   */
  constructor(private userServices: UserService) {
 
    this.supplierAdded = false;
    this.supplierAddedError = false;
    this.ShowAllSupplier = false;
    this.supplierDeleted = false;
    this.supplierDeletedError = false
    this.UpdateSupplier = false;
    this.UpdateSupplierError = false;
  }

  supplierForm = new  FormGroup({
      name : new FormControl("",[Validators.minLength(3),Validators.required]),
      contacts : new FormControl("",[Validators.min(3),Validators.required]),

    })

    supplierUpdateForm = new  FormGroup({
      id : new FormControl("",[Validators.min(1),Validators.required]),
      name : new FormControl("",[Validators.minLength(3),Validators.required]),
      contacts : new FormControl("",[Validators.min(3),Validators.required])
    })
  DeleteSupplierBYID =  new FormGroup({
      userid : new FormControl("",[Validators.minLength(1),Validators.required]),
  
    })

 
  showForm() {
    this.formVisible = true;
    this.updateFormVisible = false;
    this.deleteFormVisible = false;
    this.ShowAllSupplier = false;
  }


  onSubmit(){
    this.ShowAllSupplier = false;
    let supplier : Supplier = {
      name : this.supplierForm.value?.name as string,
      contact : this.supplierForm.value?.contacts as string
    }

    this.userServices.AddSupplier(supplier).subscribe((data:any) => {
      console.log(data);
      this.supplierAdded = true;
      this.supplierAddedError = false;
    },
  (error:any) => {
    console.log(error);
    this.supplierAdded = false;
    this.supplierAddedError = true;
  });
  }
    
  


  showUpdateForm() {
    this.ShowAllSupplier = false;
    this.supplierName = 'mahindra Suppliers'; 
    this.supplierContact = '1234567890'; 
    this.updateFormVisible = true;
    this.formVisible = false;
    this.deleteFormVisible = false; 
  }

  showDeleteForm() {
    this.ShowAllSupplier = false;
    this.supplierId = ''; 
    this.deleteFormVisible = true;
    this.formVisible = false;
    this.updateFormVisible = false; 
  }

  cancelForm() {
    this.ShowAllSupplier = false;
    this.formVisible = false;
    this.supplierName = '';
    this.supplierContact = '';
  }

  cancelUpdateForm() {
    this.ShowAllSupplier = false;
    this.updateFormVisible = false;
    this.supplierName = '';
    this.supplierContact = '';
  }

  cancelDeleteForm() {
    this.ShowAllSupplier = false;
    this.deleteFormVisible = false;
    this.supplierId = '';
  }

  // onSubmit() {
  //   if (this.supplierName && this.supplierContact) {
  //     console.log('Supplier Added:', this.supplierName, this.supplierContact);
  //     this.cancelForm();
  //     location.reload();
  //   }
  // }

  onUpdate() {
    this.ShowAllSupplier = false;
    if (this.supplierName && this.supplierContact) {
      console.log('Supplier Updated:', this.supplierName, this.supplierContact);
      this.cancelUpdateForm();
      location.reload();
    }
  }

  onDelete() {
    this.ShowAllSupplier = false;
    let supplierID = this.DeleteSupplierBYID.get('userid')?.value as string;
    this.userServices.deleteSupplier(supplierID).subscribe((data:any) => {

      console.log(data);
      this.supplierDeleted = true;
      this.supplierDeletedError = false
  

    },(Err:any)=>{
      console.log(Err)
      this.supplierDeleted = false;
      this.supplierDeletedError = true
    });
    
  }

  onUpdateSubmit(){
    let supplier : Supplier = {
      name : this.supplierUpdateForm.get('name')?.value as string,  
      contact :  this.supplierUpdateForm.get('contacts')?.value as string
    }
    let id = this.supplierUpdateForm.get('id')?.value as string;
    this.userServices.UpdateSupplier(supplier,id).subscribe((data:any) => {
      console.log(data);
      this.UpdateSupplier = true;
      this.UpdateSupplierError = false;
    },(err:any)=>{
      this.UpdateSupplier = false;
      this.UpdateSupplierError = true;
      console.log(err); 
    })
  }

  seeAllSuppliers() 
  {
    this.ShowAllSupplier = true;
    this.userServices.SeeAllSuppliers().subscribe((data:any) => {
      console.log(data);
      this.suppliers = data;

    },(error)=>{
      console.log(error);
    })
  }
}
