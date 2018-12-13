import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppRegExpressionsConfig } from '../litterals/app.regexpressions';

export class LyricsManager {
    private groups: FormArray;
    private formBuilder: FormBuilder;

    constructor() { }
    setGroup(groups: FormArray) {
        this.groups = groups;
    }

    setFormBuilder(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
    }

    clear() {
        if (this.groups) {
            for (let i = 0, ln = this.groups.length; i < ln; i++) {
                this.groups.removeAt(0);
            }
        }
    }

    initLyricForm(lyricsValue: any = {}) {
        // tslint:disable-next-line:prefer-const
        let group: any = this.formBuilder.group({
            // tslint:disable-next-line:max-line-length
            'LYRICS': [lyricsValue.LYRICS, Validators.compose([Validators.required, Validators.pattern(AppRegExpressionsConfig.lyricValidator)])],
            'SYLLABLE_COUNT': [lyricsValue.SYLLABLE_COUNT, Validators.required],
            'DURATION_IN_BEATS': [lyricsValue.DURATION_IN_BEATS, Validators.required]
        });
        this.groups.push(group);
        return group;
    }

    removeLyric(i: number) {
        this.groups.removeAt(i);
    }

    setData(lyricsGroup: Array<any>) {
        for (let i = 0; lyricsGroup.length > i; i++) {
            // tslint:disable-next-line:prefer-const
            let lyric = lyricsGroup[i];
            // tslint:disable-next-line:prefer-const
            let object: any = Object;
            this.initLyricForm(lyric);
        }
    }
}