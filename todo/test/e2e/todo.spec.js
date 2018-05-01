import { PageObjectTodoList} from './page-objects/todo-list.po.js'

describe('User updates todo list', () => {

    let poTodoList;
    beforeEach(async () => {
        poTodoList = new PageObjectTodoList();
        await browser.loadAndWaitForAureliaPage('http://localhost:9000');
    })

    it('should load the page and great the user', async () => {

        await expect(element(by.tagName('H1')).getText()).toBe('Welcome, Nick!');
    });

    it('should let user mark todo as complete', async () => {
        // Mark a todo List item as complete
        poTodoList.markComplete(0);
        browser.sleep(2000);
        // Make sure there is a line through the checklist item
        await expect(poTodoList.getTextDecoration(0)).toContain('line-through')
    });


    it('should let user delete todo item', async () => {
        let nextTodoItem = poTodoList.getItemText(2);
        browser.sleep(1000);
        poTodoList.deleteItem(1);
        browser.sleep(1000);
        await expect(poTodoList.getItemText(1)).toBe(nextTodoItem);
        browser.sleep(1000);
    });
});