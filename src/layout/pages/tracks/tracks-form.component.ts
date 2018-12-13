import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { LyricsManager } from '../../../providers/utils/lyrics.manager';
@Component({
    selector: 'app-tracks-form',
    templateUrl: './tracks-form.component.html',
    styleUrls: ['./tracks-form.component.css']
})

export class TracksFormComponent implements OnInit {
    public syllablesData: any;

    @Input('index')
    public index;

    @Input('group')
    public group;

    @Input('syllables')
    set syllablesDataValue(value){
        this.syllablesData = value;
    }
    public lyricsForm: FormArray;
    public tracksForm: any;
    public i:number = 1;
    lyricManager: LyricsManager = new LyricsManager();

    constructor(public formBuilder: FormBuilder) {
        this.tracksForm = this.formBuilder.group({
            lyricsForm: this.formBuilder.array([])
        });
        this.lyricManager.setGroup(<FormArray>this.tracksForm.get('lyricsForm'));
        this.lyricManager.setFormBuilder(this.formBuilder);
    }

    ngOnInit() {
        console.log(this.group, this.index);
        this.lyricManager.initLyricForm();
    }

    addItem(i) {
        this.tracksForm = this.tracksForm.get('tracksForm') as FormArray;
        this.lyricsForm.push(this.createItem(i+1));
        console.log(this.lyricsForm);
    }

    createItem(i) {
        return this.formBuilder.group({
            'ID': [i]
        });
    }
}