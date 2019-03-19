import { LightningElement, api, track } from 'lwc';
import saveReview from "@salesforce/apex/BoatReviews.saveReview";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { String as StringUtils } from 'c/util';

export default class Addboatreviewlwc extends LightningElement {

    @api
    boat;

    @track
    review = {
        Name: "",
        Comment__c: "<p></p>",
        Rating__c: undefined
    };

    get saveDisabled() {
        return StringUtils.isBlank(this.review.Name) || !this.review.Rating__c;
    }

    @track
    saving = false;

    @track
    saveError;

    onTitleChange(event) {
        this.review.Name = event.target.value;
    }

    onCommentChange(event) {
        this.review.Comment__c = event.detail.value;
    }

    onRatingChange(event) {
        this.review.Rating__c = event.detail.rating;
    }

    clear() {
        console.log("-- Clear Review");
        this.review.Name = "";
        this.review.Comment__c = "<p></p>";
        this.review.Rating__c = 0;
    }

    async saveReview() {
        const reviewForSave = { ...this.review, Boat__c: this.boat.Id };
        console.log(`-- On Save: ${JSON.stringify(reviewForSave)}`);
        this.saving = true;
        try {
            const reviewId = await saveReview({ review: reviewForSave });
            // clear review
            this.clear();
            // notify
            this.dispatchEvent(new CustomEvent("boatreviewadded", {
                detail: {
                    reviewId: reviewId
                }
            }));
        } catch(error) {
            console.log("-- Error Saving Review");
            console.error(error);
            this.saveError = error;
            const evt = new ShowToastEvent({
                title: "Error Saving Review",
                message: error.message ? error.message: undefined,
                variant: "error"
            });
            this.dispatchEvent(evt);
        }
    }

    onSave() {
        this.saveReview();
    }
}