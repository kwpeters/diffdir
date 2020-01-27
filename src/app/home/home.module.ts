import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import {DirectoryPickerComponent} from "../directory-picker/directory-picker.component";
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [HomeComponent, DirectoryPickerComponent],
    imports: [CommonModule, SharedModule, HomeRoutingModule]
})
export class HomeModule {}
