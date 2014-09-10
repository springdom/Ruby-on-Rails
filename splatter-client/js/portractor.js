it('should check ng-show / ng-hide', function() {
    expect(thumbsUp.isDisplayed()).toBeFalsy();
    expect(thumbsDown.isDisplayed()).toBeTruthy();

    element(by.model('checked')).click();
});
