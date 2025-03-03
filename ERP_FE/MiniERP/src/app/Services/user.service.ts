import { HttpClient } from "@angular/common/http";
import {Userlogin} from './../models/userlogin';
import {SalesUserAdd} from './../models/Salesuseradd';
import {Product} from './../models/Products';
import { Injectable } from "@angular/core";
import { Customer } from "../models/Customer";
import { Supplier } from "../models/Supplier";
@Injectable({
  providedIn: 'root'
})

export class UserService{
    
    Baseurl : string;

    constructor(private httpClient:HttpClient) {
      this.Baseurl = "https://localhost:7274";   
    }



    //login
    UserloginRequest(userinfo : Userlogin)
    {
        let  url = this.Baseurl + "/api/auth/login/" ;

        let requestBody = userinfo;
        return this.httpClient.post(url,requestBody);

     
    } 

    AddSalesPerson(body : SalesUserAdd)
    {
        let url = this.Baseurl + "/api/auth/add-user/";
        let requestBody = body;
        return this.httpClient.post(url,requestBody,{
          headers : {
            Authorization : 'Bearer ' + localStorage.getItem('token')
          }
        });

    }


    ShowAllUsers(){
        let url = this.Baseurl + "/api/admin/users";
        return this.httpClient.get(url,{
          headers : {
            Authorization : 'Bearer ' + localStorage.getItem('token')
          }}
        );
    }

    SeeUserById(id : string){
      let url = this.Baseurl + "/api/admin/user/" + parseInt(id);
      return this.httpClient.get(url,{
        headers : {
          Authorization : 'Bearer ' + localStorage.getItem('token')
        }}
      );

    }
    

    DeleteUser(id : string){
      let url = this.Baseurl + "/api/admin/delete-user/" + parseInt(id);
      return this.httpClient.delete(url,{
        headers : {
          Authorization : 'Bearer ' + localStorage.getItem('token')
        }}
      );
    }


    AddProduct(body : Product){
      let url = this.Baseurl + "/api/admin/products";
      let requestBody = body;
      return this.httpClient.post(url,requestBody,{
        headers : {
          Authorization : 'Bearer ' + localStorage.getItem('token')
        }
      });
    }


    SeeAllProducts(){
      let url = this.Baseurl + "/api/admin/products";
      return this.httpClient.get(url,{
        headers : {
          Authorization : 'Bearer ' + localStorage.getItem('token')
        }}
      );
    }

    AddSalesaCustomer(body:Customer){
      let url = this.Baseurl + "/api/sales/customers/add";
      return this.httpClient.post(url,body,{
        headers : {
          Authorization : 'Bearer ' + localStorage.getItem('token')
        }}
      );
}


SeeAllCustomers(){
  let url = this.Baseurl + "/api/sales/customers/all";
  return this.httpClient.get(url,{
    headers : {
      Authorization : 'Bearer ' + localStorage.getItem('token')
    }}
  );
}


DeleteCustomerByID(id : string){
  let url = this.Baseurl + "/api/sales/customers/delete/" + parseInt(id);
  return this.httpClient.delete(url,{
    headers : {
      Authorization : 'Bearer ' + localStorage.getItem('token')
    }}
  );
}

AddSupplier(body:Supplier){
  let url = this.Baseurl + "/api/supplier/add/";
  return this.httpClient.post(url,body,{
    headers : {
      Authorization : 'Bearer ' + localStorage.getItem('token')
    }}
  );
}

SeeAllSuppliers(){
  let url = this.Baseurl + "/api/supplier/all/";
  return this.httpClient.get(url,{
    headers : {
      Authorization : 'Bearer ' + localStorage.getItem('token')
    }}
  );
}

deleteSupplier(id:string){
  let url = this.Baseurl + "/api/supplier/delete/"+ parseInt(id);
  return this.httpClient.delete(url,{
    headers : {
      Authorization : 'Bearer ' + localStorage.getItem('token')
    }}
  );
}

UpdateSupplier(body:Supplier,id:string){
  let url = this.Baseurl + "/api/supplier/update/"+ parseInt(id);
  return this.httpClient.put(url,body,{
    headers : {
      Authorization : 'Bearer ' + localStorage.getItem('token')
    }}
  );
}

}

