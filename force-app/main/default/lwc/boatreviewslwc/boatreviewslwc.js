import { LightningElement, api, track } from 'lwc';
import getAll from "@salesforce/apex/BoatReviews.getAll";

export default class Boatreviewslwc extends LightningElement {

    _boat;

    @api
    get boat() {
        return this._boat;
    }
    set boat(value) {
        this._boat = value;
        this.loadReviews();
    }

    @track
    reviews = [];

    @track
    loadState = {
        loaded: false,
        loading: false,
        error: undefined
    };

    get reviewsEmpty() {
        return this.loadState.loaded && !this.loadState.error && (!this.reviews || this.reviews.length === 0);
    }

    async loadReviews() {
        this.loadState.loading = true;
        try {
            this.reviews = await getAll({ boatId: this.boat.Id });
        } catch(error) {
            console.log("-- Error loading reviews: " + error);
            console.error(error);
            this.loadState.error = error;
        } finally {
            this.loadState.loading = false;
            this.loadState.loaded = true;
        }
    }

    connectedCallback() {
        this.loadReviews();    
    }
}