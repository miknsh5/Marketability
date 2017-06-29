import { MarkebilityPage } from './app.po';

describe('markebility App', () => {
  let page: MarkebilityPage;

  beforeEach(() => {
    page = new MarkebilityPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
