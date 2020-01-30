import { Injectable } from "@angular/core";
import {Observable, from} from "rxjs";
import {switchMap, filter, withLatestFrom, map} from "rxjs/operators";
import {createSelector, Action, Store} from "@ngrx/store";
import { Actions, Effect, ofType} from '@ngrx/effects';

import {Directory} from "../depot/directory";
import {diffDirectories, DiffDirFileItem} from "../depot/diffDirectories";


////////////////////////////////////////////////////////////////////////////////
// State
////////////////////////////////////////////////////////////////////////////////

export interface IAppState
{
    leftDir: Directory | undefined;
    rightDir: Directory | undefined;
    differencesUpdateInProgress: boolean;
}


export interface IState
{
    appState: IAppState;
}


const initialState: IAppState = {
    leftDir: undefined,
    rightDir: undefined,
    differencesUpdateInProgress: false
};


////////////////////////////////////////////////////////////////////////////////
// Actions
////////////////////////////////////////////////////////////////////////////////


//
// Action type strings.
//
export enum AppActionTypes
{
    setLeftDir               = "[root] set left directory",
    setRightDir              = "[root] set right directory",
    differenceUpdateStart    = "[root] difference update start",
    differenceUpdateComplete = "[root] difference update complete"
}


//
// Action classes
//

export class SetLeftDir implements Action
{
    public readonly type = AppActionTypes.setLeftDir;
    public constructor(public leftDir: Directory)
    {
    }
}


export class SetRightDir implements Action
{
    public readonly type = AppActionTypes.setRightDir;
    public constructor(public rightDir: Directory)
    {
    }
}


export class DifferenceUpdateStart implements Action
{
    public readonly type = AppActionTypes.differenceUpdateStart;
    public constructor()
    {
    }
}


export class DifferenceUpdateComplete implements Action
{
    public readonly type = AppActionTypes.differenceUpdateComplete;
    constructor(public readonly diffDirFileItems: Array<DiffDirFileItem>)
    {
    }
}


//
// Actions union type
//

export type AppActions =
    SetLeftDir |
    SetRightDir |
    DifferenceUpdateStart |
    DifferenceUpdateComplete;


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

        case AppActionTypes.differenceUpdateStart:
            newState.differencesUpdateInProgress = true;
            break;

        case AppActionTypes.differenceUpdateComplete:
            console.log("Got complete action with the following results:");
            console.log(action.diffDirFileItems);
            newState.differencesUpdateInProgress = false;
            break;
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

export const getDifferencesUpdateInProgress = createSelector(
    selectApp,
    (state: IAppState) => state.differencesUpdateInProgress
);


////////////////////////////////////////////////////////////////////////////////
// Effects
////////////////////////////////////////////////////////////////////////////////


@Injectable()
export class AppEffects
{
    constructor(
        private actions$: Actions,
        private store$: Store<IState>
    )
    { }


    @Effect()
    directoryChange$: Observable<Action> = this.actions$
    .pipe(
        filter((action: Action) => {
            return (action.type === AppActionTypes.setLeftDir) ||
                   (action.type === AppActionTypes.setRightDir);
        }),
        switchMap(() => {
            return from([new DifferenceUpdateStart()]);
        })
    );


    @Effect()
    differenceUpdateStart$: Observable<Action> = this.actions$
    .pipe(
        ofType(AppActionTypes.differenceUpdateStart),
        withLatestFrom(this.store$),
        switchMap(([, storeState]) => {

            const leftDir = getLeftDir(storeState);
            const rightDir = getRightDir(storeState);

            if (!leftDir || !rightDir) {
                console.log("One or more directory not specified.  Completing update now.");
                return from([new DifferenceUpdateComplete([])]);
            }

            return from(diffDirectories(leftDir, rightDir, undefined, true))
            .pipe(
                map((diffDirFileItems) => new DifferenceUpdateComplete(diffDirFileItems))
            );
        })
    );
}


// TODO: Fix problem where diffDirectories() opens more files than the OS can support.
