import { Component, OnInit } from '@angular/core';
import {
	FormGroup,
	FormControl,
	FormBuilder,
	FormArray,
	Validators
} from '@angular/forms';

import { AppRegExpressionsConfig } from '../../../providers/litterals/app.regexpressions';
import { AppLitteralsConfig } from "../../../providers/litterals/app.litterals";
import { MasterDataService } from '../../../providers/services/master-data.service';
@Component({
	selector: 'app-simple',
	templateUrl: './simple.component.html',
	styleUrls: ['./simple.component.css']
})
export class SimpleComponent implements OnInit {
	public registerForm: FormGroup;
	public tempoValues: any;
	public instruments: any;
	public shareLevels: any;
	public lyricsForm: FormArray;
	public AppLitteralsConfig: any = AppLitteralsConfig;
	public tracksForm: FormArray;
	public deleteDisableFlag: boolean = true;
	public syllables: any;
	public track:any;

	constructor(
		public formBuilder: FormBuilder,
		public masterService: MasterDataService,
	) {
		this.registerForm = formBuilder.group({
			NAME: [
				null,
				Validators.compose([
					Validators.required,
					Validators.pattern(AppRegExpressionsConfig.lyricValidator)
				])
			],
			DESCRIPTION: [
				null,
				Validators.compose([
					Validators.required,
					Validators.pattern(AppRegExpressionsConfig.lyricValidator)
				])
			],
			KEYWORDS: [
				null,
				Validators.compose([
					Validators.required,
					Validators.pattern(AppRegExpressionsConfig.lyricValidator)
				])
			],
			TEMPO: [null, Validators.compose([Validators.required])],
			INSTRUMENT: [null, Validators.compose([Validators.required])],
			SHARE_LEVEL: [null, Validators.compose([Validators.required])],
			TOTAL_BEAT_COUNT: [null, Validators.compose([Validators.required, Validators.pattern(AppRegExpressionsConfig.beatCount)])],
			tracksForm: this.formBuilder.array([this.createItem(0)])
		});
	}

	ngOnInit() {
		this.masterService.getMasterData().subscribe(
			data => {
				console.log(data);
				this.tempoValues = data.TEMPO_VALUES || [];
				this.instruments = data.INSTRUMENTS || [];
				this.shareLevels = data.SHARE_LEVELS || [];
			},
			error => {
				console.log(error);
			}
		);
		this.lyricsForm = this.registerForm.get('tracksForm') as FormArray;
	}

	private createItem(i) {
		return this.formBuilder.group({
			'ID': [i]
		});
	}

	addItem(index): void {
		this.lyricsForm = this.registerForm.get('tracksForm') as FormArray;
		if (this.lyricsForm.length > 1) {
			this.alteringArray(index);
			this.deleteDisableFlag = false;
		} else {
			this.lyricsForm.push(this.createItem(index+1));
			this.deleteDisableFlag = false;
		}
	}

	alteringArray(index) {
		for (let i = 0; i < this.lyricsForm.length; i++) {
			if (index === i) {
				this.track = this.createItem(index);
				this.lyricsForm.controls.splice(i+1, 0, this.track);
				this.lyricsForm.value.splice(i+1, 0, this.track.value);
			}
		}
	}
	deleteItem(index) {
		this.lyricsForm.removeAt(index);
		if(this.lyricsForm.length == 1){
			this.deleteDisableFlag = true;
		}else{
			this.deleteDisableFlag = false;
		}
	}

	submitData(){
		let korvai = this.registerForm.value;
		let lyricsData = this.masterService.getLyricsData();
		if(lyricsData.length === 1){
			lyricsData[0]['clipIndex'] = 1;
			lyricsData[0]['rhythmClipLineId'] = "RCLId";
			lyricsData[0]['rhythmClipLineText'] = lyricsData[0].LYRICS;
			lyricsData[0]['durationInBeats'] = lyricsData[0].DURATION_IN_BEATS;
			lyricsData[0]['instrumentId'] = korvai.INSTRUMENT;
			delete lyricsData[0].DURATION_IN_BEATS;
			delete lyricsData[0].SYLLABLE_COUNT;
			delete lyricsData[0].LYRICS;
			lyricsData = lyricsData[0];
		}else{
			for(let i=0; i < lyricsData.length; i++){
				lyricsData[i]['clipIndex'] = i+1;
				lyricsData[i]['rhythmClipLineId'] = "RCLId";
				lyricsData[i]['rhythmClipLineText'] = lyricsData[i].LYRICS;
				lyricsData[i]['durationInBeats'] = lyricsData[i].DURATION_IN_BEATS;
				lyricsData[i]['instrumentId'] = korvai.INSTRUMENT;
				delete lyricsData[i].DURATION_IN_BEATS;
				delete lyricsData[i].SYLLABLE_COUNT;
				delete lyricsData[i].LYRICS;
			}
		}
		let korvaiPart = korvai.tracksForm || [];
		let newKorvai:any = {};
		if(korvaiPart.length === 1){
			korvaiPart[0].partIndex = korvaiPart[0].ID;
			delete korvaiPart[0].ID;
			newKorvai.partIndex = 1;
			console.log(newKorvai)
		}else{
			for(let i=1; i < korvaiPart.length; i++){
				korvaiPart[i].partIndex = korvaiPart[i].ID;
				delete korvaiPart[i].ID;
			}
		}
		newKorvai.KorvaiLines = [{ KorvaiLine: { lineIndex: 1, KorvaiClips: [{ KorvaiClip: lyricsData }] } }];
		let request = {
			"name": korvai.NAME,
			"keywords": korvai.KEYWORDS,
			"description": korvai.DESCRIPTION,
			"instrumentId": korvai.INSTRUMENT,
			"createddate": new Date().getTime(),
			"modifieddate": new Date().getTime(),
			"shareLevel": korvai.SHARE_LEVEL,
			"clientAccessTag": "",
			"tempo": korvai.TEMPO,
			"KorvaiParts": [
				{
					"korvaiPart": newKorvai
				}
			]
		}
		console.log(JSON.stringify(request));
		// let tracks = [
		// 	{
		// 		"KorvaiPart": {
		// 			"partIndex": 
		// 		}
		// 	}
		// ]
	}

	getSyllables(event){
		let instrumentId = event.target.value;
		this.masterService.getSyllablesData(instrumentId).subscribe(
			data => {
				console.log(data.SY);
				let syllables = data.SYLLABLES || [];
				for(let i=0; i <= syllables.length; i++){
					let syllablesData = syllables[i] || [];
					if(syllablesData.Id === instrumentId){
						console.log(syllablesData.Id);
						this.syllables = syllablesData.VirtualInstrumentKeys || [];
						this.masterService.setInstrument(syllablesData.Id);
					}
				}
			}
		);
	}
}
