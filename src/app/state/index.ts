import { Injectable } from "@angular/core";
import {Observable, from} from "rxjs";
import {switchMap, withLatestFrom, filter} from "rxjs/operators";
import {createSelector, Action, Store} from "@ngrx/store";
import { Actions, Effect} from '@ngrx/effects';

import {Directory} from "../depot/directory";


////////////////////////////////////////////////////////////////////////////////
// Constants
////////////////////////////////////////////////////////////////////////////////

const STATUS_OK = "ok";
const STATUS_DIRECTORY_NOT_DEFINED_LEFT = "Set the left directory.";
const STATUS_DIRECTORY_NOT_DEFINED_RIGHT = "Set the right directory.";
const STATUS_DIRECTORY_NOT_DEFINED_BOTH = "Set the left and right directories.";


////////////////////////////////////////////////////////////////////////////////
// State
////////////////////////////////////////////////////////////////////////////////

export interface IAppState
{
    leftDir: Directory | undefined;
    rightDir: Directory | undefined;
    statusMessage: string;
}


export interface IState
{
    appState: IAppState;
}


const initialState: IAppState = {
    leftDir: undefined,
    rightDir: undefined,
    statusMessage: STATUS_DIRECTORY_NOT_DEFINED_BOTH
};


////////////////////////////////////////////////////////////////////////////////
// Actions
////////////////////////////////////////////////////////////////////////////////


//
// Action type strings.
//
export enum AppActionTypes
{
    setLeftDir             = "[root] set left directory",
    setRightDir            = "[root] set right directory",
    startDifferencesUpdate = "[root] start differences update"
}


//
// Action classes
//

export class SetLeftDir implements Action
{
    public readonly type = AppActionTypes.setLeftDir;
    public constructor(public leftDir: Directory)
    {}
}


export class SetRightDir implements Action
{
    public readonly type = AppActionTypes.setRightDir;
    public constructor(public rightDir: Directory)
    {}
}


export class StartDifferencesUpdate implements Action
{
    public readonly type = AppActionTypes.startDifferencesUpdate;
    public constructor()
    {}
}


//
// Actions union type
//

export type AppActions =
    SetLeftDir |
    SetRightDir |
    StartDifferencesUpdate;


////////////////////////////////////////////////////////////////////////////////
// Reducer
////////////////////////////////////////////////////////////////////////////////

export function reducer(state: IAppState = initialState, action: AppActions): IAppState
{
    const newState: IAppState = { ...state };

    switch (action.type)
    {
        case AppActionTypes.setLeftDir:
            newState.leftDir = action.leftDir;
            break;

        case AppActionTypes.setRightDir:
            newState.rightDir = action.rightDir;
            break;

        case AppActionTypes.startDifferencesUpdate:
            break;
    }

    // Update the status message
    if ((newState.leftDir === undefined) && (newState.rightDir === undefined))
    {
        newState.statusMessage = STATUS_DIRECTORY_NOT_DEFINED_BOTH;
    }
    else if (newState.leftDir === undefined)
    {
        newState.statusMessage = STATUS_DIRECTORY_NOT_DEFINED_LEFT;
    }
    else if (newState.rightDir === undefined)
    {
        newState.statusMessage = STATUS_DIRECTORY_NOT_DEFINED_RIGHT;
    }
    else
    {
        newState.statusMessage = STATUS_OK;
    }

    return newState;
}


////////////////////////////////////////////////////////////////////////////////
// Selectors
////////////////////////////////////////////////////////////////////////////////

export const selectApp = (state: IState): IAppState => state.appState;

export const getLeftDir = createSelector(
    selectApp,
    (state: IAppState) => state.leftDir
);

export const getRightDir = createSelector(
    selectApp,
    (state: IAppState) => state.rightDir
);

export const getStatusMessage = createSelector(
    selectApp,
    (state: IAppState) => state.statusMessage
);


////////////////////////////////////////////////////////////////////////////////
// Effects
////////////////////////////////////////////////////////////////////////////////


@Injectable()
export class AppEffects
{
    // private _actions$: Actions;
    // private _store: Store<IState>;

    constructor(private actions$: Actions, private store: Store<IState>)
    {
        // console.log("_actions$:", actions$);
        // this._actions$ = actions$;
        // this._store = store;
    }


    @Effect()
    directoryChange$: Observable<Action> = this.actions$
    .pipe(
        filter((action: Action) => {
            return (action.type === AppActionTypes.setLeftDir) ||
                   (action.type === AppActionTypes.setRightDir);
        }),
        withLatestFrom(this.store),
        switchMap(([, store]) => {

            const leftDir = getLeftDir(store);
            // console.log("leftDir:", leftDir);

            const rightDir = getRightDir(store);
            // console.log("rightDir:", rightDir);

            if (leftDir && rightDir) {
                return from([new StartDifferencesUpdate()]);
            }
            else {
                return from([]);
            }
        })
    );



}
