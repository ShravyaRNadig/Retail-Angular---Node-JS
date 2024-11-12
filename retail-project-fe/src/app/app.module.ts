import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { AppComponent } from './app.component';
import { ProductService } from './product.service';  // Create a ProductService for API calls

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  // Add HttpClientModule to imports
    FormsModule  // Add FormsModule here
  ],
  providers: [ProductService],  // Register ProductService here
  bootstrap: [AppComponent]
})
export class AppModule { }
