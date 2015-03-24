'use strict';

describe('Memos E2E Tests:', function() {
	describe('Test Memos page', function() {
		it('Should not include new Memos', function() {
			browser.get('http://localhost:3000/#!/memos');
			expect(element.all(by.repeater('memo in memos')).count()).toEqual(0);
		});
	});
});
