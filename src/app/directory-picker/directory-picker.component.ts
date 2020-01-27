import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {Directory} from "../depot/directory";
import {ElectronService} from "../core/services/electron/electron.service";


@Component({
    selector: 'app-directory-picker',
    templateUrl: './directory-picker.component.html',
    styleUrls: ['./directory-picker.component.scss']
})
export class DirectoryPickerComponent implements OnInit
{
    private _electronService: ElectronService;
    public vm: {
        dirName: string;
    };


    @Input()
    initialDirectory: string;
    @Output()
    onDirectoryChanged = new EventEmitter<Directory>();


    constructor(electronService: ElectronService)
    {
        this._electronService = electronService;
    }


    ngOnInit()
    {
        this.vm = {
            dirName: this.initialDirectory
        };
    }


    public onBrowse(): void
    {

        this._electronService.ipcRenderer.invoke("openFolder")
        .then((filePaths) => {
            const selectedDir =  filePaths[0];
            this.vm.dirName = selectedDir;
            this.onDirectoryChanged.emit(new Directory(selectedDir));
        });
    }
}
