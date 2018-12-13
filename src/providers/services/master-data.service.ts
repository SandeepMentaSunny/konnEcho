import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class MasterDataService {
    public masterData: any;
    public environment: string;
    public lyricsValue: any;
    public instrumentId: string;
    constructor(public http: Http) {

    }

    setEnv(env){
        this.environment = env;
    }

    getMasterData() {
        if(this.environment === '4200'){
            return this.http.get('/assets/database/master-data.json').map(res => res.json());
        }else{
            return this.http.get('https:urlName/api/VirtualInstruments').map(res => res.json());
        }
    }

    getSyllablesData(instrumentId){
        if(this.environment === '4200'){
            return this.http.get('/assets/database/syllables-data.json').map(res => res.json());
        }else{
            return this.http.get('https:urlName/api/VirtualInstruments?virtualInstrumentId=' + instrumentId).map(res => res.json());
        }
    }

    setLyricsFormData(lyrics){
        this.lyricsValue = lyrics || {};
    }

    getLyricsData(){
        return this.lyricsValue;
    }

    setInstrument(id){
        this.instrumentId = id;
    }

    getInstrument(){
        return this.instrumentId;
    }
}