import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

describe('TodoList', () => {
    let component;
    let todos = [{title:'Item 1' ,done: false},
      {title: 'Item 2',done: false},
      {title: 'Item 3',done: true}
    ];

    beforeEach(() => {

        component = StageComponent
        .withResources('./resources/elements/todo-list')
        .inView('<todo-list todos.bind ="todos"></todo-list>')
        .boundTo({todos});
    });

    it('should render the todos', done => {
        component.create(bootstrap).then(() => {
            const listElements = document.querySelectorAll('.item');
            expect(listElements[0].innerHTML.trim()).toBe('Item 1');
            console.log("Custom Log by Is item present: ");
            done()
        }).catch(e => {
            console.log("Custom Log by Dev: "+e.toString());
        });

    });

    it('should check checkbox for completed todos', done => {
        component.create(bootstrap).then(() => {
            const checkboxes = document.querySelectorAll('input');
            expect(checkboxes[2].checked).toBe(true);
            console.log("Custom Log by checkbox: ");
            done()
        }).catch(e => {
            console.log("Custom Log by Dev: "+e.toString());
        });

    });

    it('should put aline through completed todos', done => {
        component.create(bootstrap).then(() => {
            const checkboxes = document.querySelectorAll('.item');
            expect(checkboxes[2].style.textDecoration).toBe('line-through');
            console.log("Custom Log by line- through: ");
            done()
        }).catch(e => {
            console.log("Custom Log by Dev: "+e.toString());
        });

    });

    afterEach(() => {
        component.dispose();
    });
  });
