import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';
import { RouterModule } from '@angular/router';
import { Http, HttpModule } from '@angular/http';
import {PopoverModule} from "ng4-popover";

import { AppComponent } from './app.component';
import { MasterDataService } from '../providers/services/master-data.service';
import { AppRouting } from './app.routing';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LayoutModule,
    RouterModule,
    PopoverModule,
    HttpModule,
    AppRouting
  ],
  providers: [MasterDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
