import { Component, Input, OnInit } from '@angular/core';

import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppRegExpressionsConfig } from '../../../providers/litterals/app.regexpressions';
import { AppLitteralsConfig } from '../../../providers/litterals/app.litterals';
import { MasterDataService } from './../../../providers/services/master-data.service';

@Component({
    selector: 'app-lyrics-form',
    templateUrl: './lyrics-form.component.html',
    styleUrls: ['./lyrics-form.component.css']
})

export class LyricsFormComponent implements OnInit {
    public syllables;

    @Input('index')
    public i;

    @Input('group')
    public group;

    @Input('syllables')
    set syllablesDataValue(value){
        this.syllables = value;
    }

    public lyricsForm: FormGroup;
    public items: any;
    AppLitteralsConfig: any = AppLitteralsConfig;
    public deleteDisabled: boolean = false;
    public playButton: boolean = false;
    public lyrics:any;
    public totalLyrics:any = [];

    constructor(private formBuiler: FormBuilder, public masterDataService: MasterDataService) {
        this.lyricsForm = formBuiler.group({
            items: this.formBuiler.array([this.createItem()])
        });
    }

    ngOnInit() {
        console.log(this.syllables);
    }

    createItem() {
        return this.formBuiler.group({
            'LYRICS': [null, Validators.compose([Validators.required, Validators.pattern(AppRegExpressionsConfig.lyricValidator)])],
            'SYLLABLE_COUNT': [null, Validators.compose([Validators.required])],
            'DURATION_IN_BEATS': [null, Validators.compose([Validators.required])]
        });
    }

    addItem(i) {
        this.items = this.lyricsForm.get('items') as FormArray;
        let controls = this.items.controls || [];
        if (controls.length > 0) {
            this.alteringArray(i, controls);
            this.deleteDisabled = true;
        } else {
            controls.push(this.createItem());
            this.deleteDisabled = true;
        }
    }

    deleteItem(i) {
        console.log(i);
        let controls: any = this.items.controls || [];
        this.items.controls.splice(i, 1);
        if(controls.length === 1){
            this.deleteDisabled = false;
        }
    }

    alteringArray(index, controls) {
        for (let i=0; i < controls.length; i++) {
            if(index === i){
                this.lyrics = this.createItem();
                this.items.controls.splice(i+1, 0, this.lyrics);
                this.items.value.splice(i+1, 0, this.lyrics.value);
            }
        }
    }

    generateLyrics(index){
        console.log(this.lyricsForm.get('items') as FormArray);
        console.log(index);
        let lyricsForm = this.lyricsForm.value;
        let items = lyricsForm.items || [];
        if(items.length > 1){
        	for(let i=0; i < items.length; i++){
            	if(items[i].LYRICS !== null && items[i].SYLLABLE_COUNT !== null && items[i].DURATION_IN_BEATS !== null){
					this.playButton = false;
            	}else{
					this.playButton = true;
				}
			}
        }else{
			if(items[0].LYRICS !== null && items[0].SYLLABLE_COUNT !== null && items[0].DURATION_IN_BEATS !== null){
				this.playButton = false;
            }else{
				this.playButton = true;
			}
        }
        let lyrics = items[index];
        console.log(lyrics);
        //Here you can write the api call for getting the Music file
    }

    getSyllableCount(event, index){
        console.log(event.target.value)
        let syllables = event.target.value;
        let lyricsForm: any = this.lyricsForm.controls || [];
        let controls = lyricsForm.items.controls || [];
        syllables = syllables.split(' ');
        for(let i=0; i < controls.length; i++){
            if(index === i){
                controls[i].controls.SYLLABLE_COUNT.patchValue(syllables.length);
                controls[i].controls.DURATION_IN_BEATS.patchValue(syllables.length);
            }
        }
        console.log(lyricsForm.items.value);
        // this.sendLyricsFormData.emit(lyricsForm.items.value);
        let lyrics = this.lyricsForm.get('items') as FormArray;
        if(lyrics.controls.length === 1){
            if(lyrics.controls[0].value.LYRICS !== null && lyrics.controls[0].value.SYLLABLE_COUNT !== null && lyrics.controls[0].value.DURATION_IN_BEATS !== null){
                lyrics.controls[0].value['clipIndex'] = 1;
			    lyrics.controls[0].value['rhythmClipLineId'] = "RCLId";
			    lyrics.controls[0].value['rhythmClipLineText'] = lyrics.controls[0].value.LYRICS;
			    lyrics.controls[0].value['durationInBeats'] = lyrics.controls[0].value.DURATION_IN_BEATS;
			    lyrics.controls[0].value['instrumentId'] = this.masterDataService.getInstrument();
			    delete lyrics.controls[0].value.DURATION_IN_BEATS;
			    delete lyrics.controls[0].value.SYLLABLE_COUNT;
			    delete lyrics.controls[0].value.LYRICS;
                if(this.masterDataService.lyricsValue !== undefined){
                    this.masterDataService.setLyricsFormData([]);
                    this.masterDataService.setLyricsFormData(lyrics.value);
                }else{
                    this.masterDataService.setLyricsFormData(lyrics.value); 
                }
            }else{
                return false;
            }
        }else{
            for(let i=0; i < lyrics.value.length; i++){
                if((lyrics.controls[i].value.LYRICS !== null && lyrics.controls[i].value.SYLLABLE_COUNT !== null && lyrics.controls[i].value.DURATION_IN_BEATS !== null) || lyrics.controls[i].value.clipIndex){
                    lyrics.controls[i].value['clipIndex'] = 1;
                    lyrics.controls[i].value['rhythmClipLineId'] = "RCLId";
                    lyrics.controls[i].value['rhythmClipLineText'] = lyrics.controls[i].value.LYRICS;
                    lyrics.controls[i].value['durationInBeats'] = lyrics.controls[i].value.DURATION_IN_BEATS;
                    lyrics.controls[i].value['instrumentId'] = this.masterDataService.getInstrument();
                    delete lyrics.controls[i].value.DURATION_IN_BEATS;
                    delete lyrics.controls[i].value.SYLLABLE_COUNT;
                    delete lyrics.controls[i].value.LYRICS;
                    let lyricValue = lyrics.controls[i].value;
                    this.totalLyrics.push(lyricValue);
                }else{
                    return false;
                }
            }
            this.masterDataService.setLyricsFormData(this.totalLyrics);
        }
    }

    getSyllableTone(index, event){
        console.log(index, event);
        // for(let i=0; i < this.syllables.length; i++){
        //     let syllable = this.syllables[i];
        //     if(index === this.syllables.indexOf(syllable)){
        //         if(value.SyllableId === this.syllables[i].SyllableId){
        //             let classes = event.srcElement.className || '';
        //             if(classes === 'fas fa-play'){
        //                 this.playButton = 'fas fa-pause';
        //             }
        //         }
        //     }else{
        //         this.playButton = 'fas fa-play';
        //     }
        // }
    }
    copySyllable(event){
        console.log(event);
        let syllable = event.target.innerHTML;
        
    }

    undoTask(event){
        console.log(event)
    }

    redoTask(event){
        console.log(event)
    }
    // toggleAudio() {
    // 	if (this.audio.paused) {
    // 		this.audio.play();
    // 	} else {
	// 		this.audio.pause();
	// 	}
    // 	return this.audio.paused;
	// }
}
