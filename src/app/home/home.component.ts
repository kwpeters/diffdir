import { Component, OnInit } from '@angular/core';
import {Directory} from "../depot/directory"
import { ElectronService } from '../core/services';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit
{
    private _electronService: ElectronService;
    public messagePromise: Promise<string>;

    constructor(electronService: ElectronService) {

        this._electronService = electronService;

        const tmpDirPath = "/Users/kwpeters/tmp";
        const tmpDir = new Directory(tmpDirPath);

        this.messagePromise = tmpDir.exists()
        .then((tmpDirStats) => {
            return `tmp directory: ${JSON.stringify(tmpDirStats)}`;
        });

    }


    ngOnInit(): void {
    }


    public onChooseDirectoryA(): void
    {
        console.log("Got the click event!!!");

        // ipcRenderer.send("openFolder", () => {
        //     console.log("openFolder event sent.");
        // });
        //
        // ipcRenderer.once("folderData", (event, data) => {
        //     console.log("data:", data);
        // });

        this._electronService.ipcRenderer.invoke("openFolder", "foo")
        .then((filePaths) => {
            console.log("filePaths:", filePaths);
        });
    }


}
