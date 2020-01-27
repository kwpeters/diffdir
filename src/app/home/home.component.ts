import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {Directory} from "../depot/directory"
import * as fromApp from "../state";


@Component({
    selector:    'app-home',
    templateUrl: './home.component.html',
    styleUrls:   ['./home.component.scss']
})
export class HomeComponent implements OnInit
{
    private _store: Store<fromApp.IState>;
    public vm: {
        leftDirectory: Observable<Directory | undefined>,
        rightDirectory: Observable<Directory | undefined>,
        statusMessage: Observable<string>
    };


    constructor(store: Store<fromApp.IState>)
    {
        this._store = store;
    }


    ngOnInit(): void
    {
        this.vm = {
            leftDirectory:  this._store.pipe(select(fromApp.getLeftDir)),
            rightDirectory: this._store.pipe(select(fromApp.getRightDir)),
            statusMessage:  this._store.pipe(select(fromApp.getStatusMessage))
        };
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
