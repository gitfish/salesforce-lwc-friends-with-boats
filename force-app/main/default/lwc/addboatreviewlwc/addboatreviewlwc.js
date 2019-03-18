import { LightningElement, api, track } from 'lwc';
import saveReview from "@salesforce/apex/BoatReviews.saveReview";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Addboatreviewlwc extends LightningElement {

    @api
    boat;

    @track
    review = {};

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

    async onSave() {
        const reviewForSave = { ...this.review, Boat__c: this.boat.Id };
        console.log(`-- On Save: ${JSON.stringify(reviewForSave)}`);
        this.saving = true;
        try {
            const reviewId = await saveReview({ review: reviewForSave });
            // clear review
            this.review = {};
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
}