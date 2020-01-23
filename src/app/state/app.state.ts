import {Directory} from "../depot/directory";
import {Action} from "@ngrx/store";


const STATUS_OK                          = "ok";
const STATUS_DIRECTORY_NOT_DEFINED_LEFT  = "Set the left directory.";
const STATUS_DIRECTORY_NOT_DEFINED_RIGHT = "Set the right directory.";
const STATUS_DIRECTORY_NOT_DEFINED_BOTH  = "Set the left and right directories.";


////////////////////////////////////////////////////////////////////////////////
// State
////////////////////////////////////////////////////////////////////////////////

interface IRootAppState
{
    leftDir:       Directory | undefined;
    rightDir:      Directory | undefined;
    statusMessage: string;
}


// Representation of the entire app state
// Extended by lazy loaded modules
export interface IState {
    rootAppState: IRootAppState;
}

const initialState: IState = {
    rootAppState: {
        leftDir:       undefined,
        rightDir:      undefined,
        statusMessage: STATUS_DIRECTORY_NOT_DEFINED_BOTH
    }
};


////////////////////////////////////////////////////////////////////////////////
// Actions
////////////////////////////////////////////////////////////////////////////////

export enum RootActionTypes {
    setLeftDir  = "[root] set left directory",
    setRightDir = "[root] set right directory"
}


export class SetLeftDir implements Action
{
    public readonly type = RootActionTypes.setLeftDir;
    public constructor(public leftDir: Directory) {}
}


export class SetRightDir implements Action
{
    public readonly type = RootActionTypes.setRightDir;
    public constructor(public rightDir: Directory) {}
}

export type RootActions = SetLeftDir |
                          SetRightDir;


////////////////////////////////////////////////////////////////////////////////
// Reducer
////////////////////////////////////////////////////////////////////////////////


export function reducer(state: IState = initialState, action: RootActions): IState
{
    const rootAppState: IRootAppState = { ...state.rootAppState };

    switch (action.type) {

        case RootActionTypes.setLeftDir:
            rootAppState.leftDir = action.leftDir;
            break;

        case RootActionTypes.setRightDir:
            rootAppState.rightDir = action.rightDir;
            break;

        default:
            return state;
    }

    // Update the status message
    if ((rootAppState.leftDir === undefined) && (rootAppState.rightDir === undefined)) {
        rootAppState.statusMessage = STATUS_DIRECTORY_NOT_DEFINED_BOTH;
    }
    else if (rootAppState.leftDir === undefined) {
        rootAppState.statusMessage = STATUS_DIRECTORY_NOT_DEFINED_LEFT;
    }
    else if (rootAppState.rightDir === undefined) {
        rootAppState.statusMessage = STATUS_DIRECTORY_NOT_DEFINED_RIGHT;
    }
    else {
        rootAppState.statusMessage = STATUS_OK;
    }

    return {...state, rootAppState: rootAppState};
}
