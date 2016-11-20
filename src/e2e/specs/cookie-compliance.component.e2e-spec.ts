/**
 * cookie-compliance.component.e2e-spec
 * get-native.com
 *
 * Created by henryehly on 2016/11/11.
 */

describe('CookieCompliance', () => {
    beforeEach(async() => {
        return await browser.get('/');
    });

    it('should be able to close the popup by pressing a button', () => {
        let dialog = $('.cookie-compliance-dialog');
        let closeButton = dialog.$('.comply-trigger');
        expect(dialog.isPresent()).toBe(true);

        //noinspection TypeScriptUnresolvedFunction
        closeButton.click();

        // TODO: Disabling animations is preferable to sleep()
        //noinspection TypeScriptUnresolvedFunction
        browser.driver.sleep(250);

        expect(dialog.isPresent()).toBe(false);
    });
});
