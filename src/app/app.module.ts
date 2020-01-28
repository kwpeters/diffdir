import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

import {AppConfig} from "../environments/environment";

import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";


import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { EffectsModule } from '@ngrx/effects';

import { HomeModule } from './home/home.module';

import { AppComponent } from './app.component';

import * as fromApp from "./state";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        CoreModule,
        SharedModule,
        HomeModule,
        AppRoutingModule,
        StoreModule.forRoot(
            {appState: fromApp.reducer} //,
            // {
            //     runtimeChecks: {
            //         strictStateImmutability: true,
            //         strictActionImmutability: true
            //     }
            // }
        ),
        StoreDevtoolsModule.instrument(
            {
                name: "diffdir DevTools",
                maxAge: 25,
                logOnly: AppConfig.production
            }
        ),
        EffectsModule.forRoot([fromApp.AppEffects]),
        NgbModule,
        TranslateModule.forRoot(
            {
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient]
                }
            }
        )
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
