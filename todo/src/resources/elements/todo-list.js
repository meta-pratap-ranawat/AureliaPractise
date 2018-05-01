import {bindable} from 'aurelia-framework';

export class TodoList {
  @bindable todos;

  valueChanged(newValue, oldValue) {

  }
}

