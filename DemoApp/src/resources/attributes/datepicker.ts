import {autoinject} from 'aurelia-framework';
import {datepicker} from 'jquery-ui' 
import * as $ from 'jquery'

@autoinject()
export class DatepickerCustomAttribute {
  constructor(private element: Element) { }

  
  attached() {
    $(this.element).datepicker()
      .on('change', e => fireEvent(e.target, 'input'));

  }

  detached() {
    $(this.element).datepicker('destroy')
      .off('change');
  }
}

function createEvent(name) 
{  
  var event = document.createEvent('Event');
  event.initEvent(name, true, true);
  return event;
}

function fireEvent(element, name) {  
  var event = createEvent(name);
  element.dispatchEvent(event);
}


