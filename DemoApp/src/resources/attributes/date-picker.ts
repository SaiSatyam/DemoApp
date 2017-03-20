import {autoinject} from 'aurelia-framework';

@autoinject()
export class DatePickerCustomAttribute {
  constructor(private element: Element) { }

  valueChanged(newValue, oldValue) {

  }
}

