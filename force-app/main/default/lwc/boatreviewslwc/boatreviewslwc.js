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
        boatId: undefined,
        loaded: false,
        loading: false,
        error: undefined
    };

    get reviewsEmpty() {
        return this.loadState.loaded && !this.loadState.error && (!this.reviews || this.reviews.length === 0);
    }

    @api
    async loadReviews() {
        const boatId = this.boat.Id;
        if(!this.loadState.loading || boatId !== this.loadState.boatId) {
            this.loadState.boatId = boatId;
            this.loadState.loading = true;
            try {
                const reviews = await getAll({ boatId: boatId });
                if(boatId === this.loadState.boatId) {
                    this.reviews = reviews;
                }
            } catch(error) {
                if(boatId === this.loadState.boatId) {
                    console.log("-- Error loading reviews: " + error);
                    console.error(error);
                    this.loadState.error = error;
                }
            } finally {
                if(boatId === this.loadState.boatId) {
                    this.loadState.loading = false;
                    this.loadState.loaded = true;
                }
            }
        }
    }

    connectedCallback() {
        this.loadReviews();    
    }
}