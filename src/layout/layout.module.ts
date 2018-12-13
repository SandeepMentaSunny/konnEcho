import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LayoutRoutes, routing } from './layout.routing';
import {PopoverModule} from "ng4-popover";

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SimpleComponent } from './pages/simple/simple.component';
import { AdvancedComponent } from './pages/advanced/advanced.component';
import { ErrorComponent } from './pages/error/error.component';
import { MasterDataService } from '../providers/services/master-data.service';
import { TracksFormComponent } from './pages/tracks/tracks-form.component';
import { LyricsFormComponent } from './pages/lyrics/lyrics-form.component';
@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SimpleComponent,
    AdvancedComponent,
    ErrorComponent,
    TracksFormComponent,
    LyricsFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    PopoverModule,
  ],
  providers: [
    LayoutRoutes,
    MasterDataService,
  ],
})
export class LayoutModule { }
