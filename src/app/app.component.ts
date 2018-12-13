import { Component, OnInit } from "@angular/core";

import { MasterDataService } from '../providers/services/master-data.service';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

	constructor(public masterDataService: MasterDataService){}

	ngOnInit(){
		let environment = window.location.port || '';
		this.masterDataService.setEnv(environment);	
	}
}
