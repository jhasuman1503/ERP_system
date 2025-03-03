import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component';
import { AdminComponent } from './app/admin/admin.component';
import { SalesComponent } from './app/sales/sales.component';
import { PurchaseComponent } from './app/purchase/purchase.component';
import { provideHttpClient } from '@angular/common/http';
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: LoginComponent }, 
      { path: 'admin', component: AdminComponent }, 
      { path: 'sales', component: SalesComponent },
      { path: 'purchase', component: PurchaseComponent },
    ]),  
    provideHttpClient()
  ], 
});
