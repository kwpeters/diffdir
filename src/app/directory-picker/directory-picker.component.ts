import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-directory-picker',
    templateUrl: './directory-picker.component.html',
    styleUrls: ['./directory-picker.component.scss']
})
export class DirectoryPickerComponent implements OnInit
{

    constructor()
    {
    }


    ngOnInit()
    {
    }


    // this._electronService.ipcRenderer.invoke("openFolder", "foo")
    // .then((filePaths) => {
    //     console.log("filePaths:", filePaths);
    // });


}
