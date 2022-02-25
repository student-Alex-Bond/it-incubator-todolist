describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
// APIs from jest-puppeteer
        await
            page.goto('http://localhost:6006/iframe.html?id=my-stories-additemform-component--add-item-form-base-example&viewMode=story');
        const image = await page.screenshot();
// API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();

    });
});
describe('App with redux', () => {
    it('base example, visually looks correct', async () => {
// APIs from jest-puppeteer
        await
            page.goto('http://localhost:6006/iframe.html?id=my-stories-appwithredux--app-with-redux-example&viewMode=story');
        const image = await page.screenshot();
// API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});



    describe('item task', () => {
        it('base example, visually looks correct', async () => {
// APIs from jest-puppeteer
            await
                page.goto('http://localhost:6006/iframe.html?id=my-stories-task-component--task-base-example&viewMode=story');
            const image = await page.screenshot();
// API from jest-image-snapshot
            expect(image).toMatchImageSnapshot();
        });
    });