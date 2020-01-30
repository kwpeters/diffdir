import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import {Directory} from "../depot/directory";
import {ElectronService} from "../core/services/electron/electron.service";
import {OpenDialogReturnValue, OpenDialogOptions} from "electron";


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
        const openDialogOptions: OpenDialogOptions = {
            title:       "Select directory to compare.",
            defaultPath: this.vm.dirName,
            buttonLabel: "Select Directory",
            properties:  ["openDirectory", "createDirectory", "promptToCreate", "treatPackageAsDirectory"],
            message:     "Select directory to compare."
        };

        this._electronService.showOpenDialog(openDialogOptions)
        .then((openResult: OpenDialogReturnValue) => {
            if (openResult.canceled) {
                // The user canceled out of the dialog.  Just pretend like
                // nothing happened.
            }
            else {
                const selectedDir = openResult.filePaths[0];
                this.vm.dirName = selectedDir;
                this.onDirectoryChanged.emit(new Directory(selectedDir));
            }
        });
    }
}
