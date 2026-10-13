import { $, expect } from '@wdio/globals';

describe('explore', () => {
  it('dump the first screen', async () => {
    await expect($('~does-not-exist')).toBeDisplayed();   
  });
});