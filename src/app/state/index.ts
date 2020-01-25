import {createSelector} from "@ngrx/store";
import * as fromApp from "./app.reducer";


export interface IState extends fromApp.IState
{
}


////////////////////////////////////////////////////////////////////////////////
// Selectors
////////////////////////////////////////////////////////////////////////////////

export const selectApp        = (state: IState): fromApp.IAppState => state.appState;
export const getLeftDir       = createSelector(selectApp, (state: fromApp.IAppState) => state.leftDir);
export const getRightDir      = createSelector(selectApp, (state: fromApp.IAppState) => state.rightDir);
export const getStatusMessage = createSelector(selectApp, (state: fromApp.IAppState) => state.statusMessage);
