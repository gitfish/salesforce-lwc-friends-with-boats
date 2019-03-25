import { LightningElement, api, track } from 'lwc';
import { registerListener, unregisterAllListeners } from "c/pubsub";
import getBoatById from "@salesforce/apex/BoatSearchResults.getBoatById";

export default class Boatdetailslwc extends LightningElement {

    @track
    boatId;

    @track
    boat;

    @track
    boatLoading = false;

    @track
    boatLoadError;

    @api
    selectedTabId;

    get boatSpecified() {
        return this.boat ? true : false;
    }

    async loadBoat(boatId) {
        this.boatId = boatId;
        this.boatLoading = true;
        try {
            this.boat = await getBoatById({ boatId: boatId });
        } catch(error) {
            this.boatLoadError = error;
        } finally {
            this.boatLoading = false;
        }
    }

    onBoatSelected(payload) {
        this.loadBoat(payload.boat.Id);
    }

    onBoatReviewAdded() {
        this.selectedTabId = "reviews";
        const reviews = this.template.querySelector("c-boatreviewslwc");
        if(reviews) {
            reviews.loadReviews();
        }
    }

    connectedCallback() {
        registerListener("friendswithboats__boatselected", this.onBoatSelected, this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

}