import { TextFieldModule } from '@angular/cdk/text-field';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { debounceTime, map, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { Policy } from '../inventory.types';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InventoryService } from '../inventory.service';


@Component({
    selector       : 'policy-details',
    templateUrl    : './details.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [NgIf, MatButtonModule, MatIconModule, FormsModule, TextFieldModule, NgFor, MatCheckboxModule, NgClass, MatRippleModule, MatMenuModule, MatDialogModule, AsyncPipe, MatRadioModule, MatStepperModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule],
})
export class PolicyDetailsComponent implements OnInit, OnDestroy
{
    horizontalStepperForm: UntypedFormGroup;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _matDialogRef: MatDialogRef<PolicyDetailsComponent>,
        private _formBuilder: UntypedFormBuilder,
        private _inventoryService: InventoryService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
       // Horizontal stepper form
       // Referenced from NotesDetailsComponent
       this.horizontalStepperForm = this._formBuilder.group({
            step1: this._formBuilder.group({
                insurerId : ['Assura'],
                price: [1354.78],
            }),
            step2: this._formBuilder.group({
                statusCode: ['ACTIVE'],
                insuranceTypeCode : ['LIFE'],
                policyNumber : ['1.134.543.1'],
            }),
            step3: this._formBuilder.group({
                timespanCode: ['48MO'],
                thumbnail : ['assets/images/apps/ecommerce/policies/assura.png'],
                object : ['John Doe'],
            }),
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    createPolicy(): void
    {
        const formValue = {
            ...this.horizontalStepperForm.value.step1,
            ...this.horizontalStepperForm.value.step2,
            ...this.horizontalStepperForm.value.step3,
        }
        // Create the product
        this._inventoryService.createPolicy(formValue).subscribe((newPolicy) =>
        {
            this._matDialogRef.close();
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });

    }
}
