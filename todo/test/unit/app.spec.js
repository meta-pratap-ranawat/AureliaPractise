import {App} from '../../src/app';

describe('the app', () => {
  it('says welcome Nick', () => {
    expect(new App().message).toBe('Welcome, Nick!');
    console.log("Custom Log by App spec Welcome");
  });
});


