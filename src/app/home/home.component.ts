import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {Directory} from "../depot/directory"
import {IState} from "../state";
import * as fromApp from "../state";


@Component({
    selector:    'app-home',
    templateUrl: './home.component.html',
    styleUrls:   ['./home.component.scss']
})
export class HomeComponent implements OnInit
{
    private _store: Store<IState>;

    public statusMessage: Observable<string>;


    constructor(store: Store<IState>)
    {
        this._store = store;
    }


    ngOnInit(): void
    {

        this.statusMessage = this._store.pipe(select(fromApp.getStatusMessage));
    }


    public onLeftDirectoryChanged(newDirectory: Directory): void
    {
        // TODO: Dispacth an action to the Store to set the left directory.
    }


    public onRightDirectoryChanged(newDirectory: Directory): void
    {
        // TODO: Dispacth an action to the Store to set the right directory.
    }


}
