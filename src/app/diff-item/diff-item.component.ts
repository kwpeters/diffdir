import {Component, Input, OnInit} from '@angular/core';
import {DiffItemVM} from "../models/diffItemVM";


@Component({
               selector:    'app-diff-item',
               templateUrl: './diff-item.component.html',
               styleUrls:   ['./diff-item.component.scss']
           })
export class DiffItemComponent implements OnInit
{

    @Input()
    diffItemVM: DiffItemVM;


    constructor()
    {
    }


    ngOnInit()
    {
    }

}
