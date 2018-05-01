export class PageObjectTodoList
{

    markComplete(index)
    {
        return  element.all(by.tagName('input')).get(index).click();
    }

    getTextDecoration(index)
    {
        return element.all(by.css('.item')).get(index).getCssValue('text-decoration');
    }

    getItemText(index)
    {
        return element.all(by.css('.item')).get(index).getText();
    }
    deleteItem(index1)
    {
        return element.all(by.css('.delete')).get(index1).click();
    }
}