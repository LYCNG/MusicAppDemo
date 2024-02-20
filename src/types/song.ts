
interface ArtistType  {
 adamid: string;
 alias:  string;
 id:     string;
}

interface Action {
 id?:  string;
 name: string;
 type: string;
 uri?: string;
}

interface BeacondataType {
    type:string
    providername:string
}

interface Option {
 actions:             Action[];
 beacondata:          BeacondataType;
 caption:             string;
 colouroverflowimage: boolean;
 image:               string;
 listcaption:         string;
 overflowimage:       string;
 providername:        string;
 type:                string;
}

interface HubType {
 actions:     Action[];
 displayname: string;
 explicit:    boolean;
 image:       string;
 options:     Option[];
 type:        string;
}
const initialHub: HubType = {
    actions:     [],
 displayname: '',
 explicit:    false,
 image:       '',
 options:     [],
 type:        ''
};

interface HighlightsurlsType {
 artisthighlightsurl: string;
 trackhighlighturl?:  string;
}

interface ImagesType {
    background: string;
    coverart: string;
    coverarthq: string;
    joecolor:string
}
const initialImages: ImagesType = {
    background: '',
    coverart:'',
    coverarthq: '',
    joecolor:''
};

interface Properties {}

interface ShareType {
 avatar?:  string;
 href:     string;
 html:     string;
 image:    string;
 snapchat: string;
 subject:  string;
 text:     string;
 twitter:  string;
}
const initialShare: ShareType = {
     href:     '',
 html:     '',
 image:    '',
 snapchat: '',
 subject:  '',
 text:     '',
 twitter:  '',
};

export interface SongType {
 artists:        ArtistType[];
 highlightsurls: HighlightsurlsType;
 hub:            HubType;
 images:         ImagesType;
 key:            string;
 layout:         string;
 properties:     Properties;
 share:          ShareType;
 subtitle:       string;
 title:          string;
 type:           string;
 url:            string;
}
export const initialSong:SongType = {
    artists:      [],
    highlightsurls: {
        artisthighlightsurl:'',
    },
    hub:            initialHub,
    images:          initialImages,
    key:            '',
    layout:        '',
    properties:     {},
    share:          initialShare,
    subtitle:       '',
    title:          '',
    type:           '',
    url:            ''
};