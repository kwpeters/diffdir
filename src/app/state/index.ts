import {createSelector, Action} from "@ngrx/store";

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
    setLeftDir = "[root] set left directory",
    setRightDir = "[root] set right directory"
}


//
// Action classes
//

export class SetLeftDir implements Action
{
    public readonly type = AppActionTypes.setLeftDir;
    public constructor(public leftDir: Directory) { }
}


export class SetRightDir implements Action
{
    public readonly type = AppActionTypes.setRightDir;
    public constructor(public rightDir: Directory) { }
}


//
// Actions union type
//

export type AppActions =
    SetLeftDir |
    SetRightDir;


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
