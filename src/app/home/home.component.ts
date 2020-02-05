import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {Directory} from "../depot/directory"
import * as fromApp from "../state";
import {DiffItemVM} from "../models/diffItemVM";


@Component({
    selector:    'app-home',
    templateUrl: './home.component.html',
    styleUrls:   ['./home.component.scss']
})
export class HomeComponent implements OnInit
{
    private _store: Store<fromApp.IState>;
    public vm: {
        leftDirectory:              Observable<Directory | undefined>,
        rightDirectory:             Observable<Directory | undefined>,
        differenceUpdateInProgress: Observable<boolean>,
        diffItemVMs:                Observable<Array<DiffItemVM>>;
    };


    constructor(store: Store<fromApp.IState>)
    {
        this._store = store;
    }


    ngOnInit(): void
    {
        this.vm = {
            leftDirectory:              this._store.pipe(select(fromApp.getLeftDir)),
            rightDirectory:             this._store.pipe(select(fromApp.getRightDir)),
            differenceUpdateInProgress: this._store.pipe(select(fromApp.getDifferencesUpdateInProgress)),
            diffItemVMs:                this._store.pipe(select(fromApp.getDiffItemVMs))
        };

        // Temporary
        this.onLeftDirectoryChanged(new Directory("/Users/kwpeters/tmp/transmission/done"));
        this.onRightDirectoryChanged(new Directory("/Users/kwpeters/tmp/transmission/in-progress"));
    }


    public onLeftDirectoryChanged(newDirectory: Directory): void
    {
        this._store.dispatch(new fromApp.SetLeftDir(newDirectory));
    }


    public onRightDirectoryChanged(newDirectory: Directory): void
    {
        this._store.dispatch(new fromApp.SetRightDir(newDirectory));
    }


}
