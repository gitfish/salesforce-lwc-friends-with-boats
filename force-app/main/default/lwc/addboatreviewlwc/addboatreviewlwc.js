import { LightningElement, api, track } from 'lwc';

export default class Addboatreviewlwc extends LightningElement {

    @api
    boat;

    @track
    review = {};

    
    onRatingChange(event) {
        this.review.Rating__c = event.detail.rating;
    }

    onSave() {
        console.log("-- On Save");
    }
}