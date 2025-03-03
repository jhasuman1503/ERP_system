﻿using MiniERP.Models;

public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }

   
    public List<SalesOrder> SalesOrders { get; set; } = new List<SalesOrder>();
}