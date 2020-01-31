import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote, OpenDialogReturnValue, OpenDialogOptions } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';

@Injectable({
    providedIn: 'root'
})
export class ElectronService
{
    private _ipcRenderer:  typeof ipcRenderer;
    private _webFrame:     typeof webFrame;
    private _remote:       typeof remote;
    private _childProcess: typeof childProcess;
    private _fs:           typeof fs;


    constructor()
    {
        // Conditional imports
        if (this.isElectron)
        {
            this._ipcRenderer  = window.require('electron').ipcRenderer;
            this._webFrame     = window.require('electron').webFrame;
            this._remote       = window.require('electron').remote;
            this._childProcess = window.require('child_process');
            this._fs           = window.require('fs');
        }
    }


    get isElectron(): boolean
    {
        return window && window.process && window.process.type;
    }


    public async showOpenDialog(openDialogOptions: OpenDialogOptions): Promise<OpenDialogReturnValue>
    {
        if (!this.isElectron) {
            return Promise.reject(new Error("showOpenDialog() is only supported when running in Electron."));
        }

        const openResult = await this._ipcRenderer.invoke("showOpenDialog", openDialogOptions);
        return openResult;
    }
}
