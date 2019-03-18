import { LightningElement, api } from 'lwc';

export default class Boatreviewlwc extends LightningElement {

    @api
    review;

    get createdByUrl() {
        return `/${this.review.CreatedBy.Id}`;
    }

}