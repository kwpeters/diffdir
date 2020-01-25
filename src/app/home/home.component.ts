import { Component, OnInit } from '@angular/core';
import {Directory} from "../depot/directory"
import { ElectronService } from '../core/services';
import { Store, select } from '@ngrx/store';
import {IState} from "../state";
import { Observable } from 'rxjs';
import * as fromApp from "../state";


@Component({
    selector:    'app-home',
    templateUrl: './home.component.html',
    styleUrls:   ['./home.component.scss']
})
export class HomeComponent implements OnInit
{
    private _store: Store<IState>;
    private _electronService: ElectronService;
    private _leftDir: Observable<Directory>;

    public statusMessage: Observable<string>;


    constructor(store: Store<IState>, electronService: ElectronService)
    {
        this._store = store;
        this._electronService = electronService;
    }


    ngOnInit(): void
    {
        this._leftDir      = this._store.pipe(select(fromApp.getLeftDir));
        this.statusMessage = this._store.pipe(select(fromApp.getStatusMessage));
    }


}
