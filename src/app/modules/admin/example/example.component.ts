import { Component, ViewEncapsulation } from '@angular/core';
import { FooterWrapperComponent } from 'app/layout/layouts/horizontal/footer-wrapper/footer-wrapper.component';

@Component({
    selector     : 'example',
    standalone   : true,
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [FooterWrapperComponent]
})
export class ExampleComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
