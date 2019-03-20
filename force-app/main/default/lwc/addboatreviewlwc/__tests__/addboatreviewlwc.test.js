import { createElement } from "lwc";

import addboatreviewlwc from "c/addboatreviewlwc";

describe("addboatreview", () => {
    it("defines input fields", () => {
        const el = createElement("c-addboatreviewlwc", { is: addboatreviewlwc });
        el.boat = {
            Id: 1,
        };
        let review;
        el.addEventListener("reviewchange", event => {
            console.log("-- Review Change: " + JSON.stringify(event.detail.review));
            review = event.detail.review;
        });
        document.body.appendChild(el);

        const titleInput = el.shadowRoot.querySelector("lightning-input");
        expect(titleInput).toBeTruthy();

        titleInput.value = "Sunburn";
        titleInput.dispatchEvent(new CustomEvent("change"));

        console.log("-- Hello");
        expect(review.Name).toBe("Sunburn")
    });

    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });
});