import { FormGroup, AbstractControl, ValidatorFn } from "@angular/forms";

// To validate password and confirm password
export function seatAvailablityValidator(capacity: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value !== undefined && (isNaN(control.value) || control.value > capacity)) {
            return { 'seatAvailablity': true };
        }
        return null;
    };
}