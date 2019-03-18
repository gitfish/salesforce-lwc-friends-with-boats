import { LightningElement, api, track } from 'lwc';
import getAll from "@salesforce/apex/BoatReviews.getAll";

export default class Boatreviewslwc extends LightningElement {

    @api
    boat;

    @track
    reviews = [];

    @track
    loadState = {
        loaded: false,
        loading: false,
        error: undefined
    };

    get reviewsEmpty() {
        return this.loadState.loaded && !this.loadState.error && (!this.review || this.reviews.length === 0);
    }

    async connectedCallback() {
        this.loadState.loading = true;
        try {
            const reviews = await getAll(this.boat.Id);
            this.reviews = reviews || [];
        } catch(error) {
            this.loadState.error = error;
        } finally {
            this.loadState.loaded = true;
        }
    }
}