import { AbstractControl } from "@angular/forms";

export function imageUrlValidator(control: AbstractControl) {
    if (isEmptyInputValue(control.value)) {
        return null;
    }
    else {
        const valid = /(http(s?):)([/|.|\w|\s|-])*/g.test(control.value);
        return valid ? null : { imageUrl: true }
    }
}
function isEmptyInputValue(value: any): boolean {
    // we don't check for string here so it also works with arrays
    return value == null || value.length === 0;
}

export function namePersonValidator(control: AbstractControl){
    if (isEmptyInputValue(control.value)) {
        return null;
    }
    else {
        const valid = /[a-zA-Z]/g.test(control.value);
        return valid ? null : { namePerson: true }
    }
}
// \.(?:jpg|gif|png)