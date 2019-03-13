import { LightningElement, api } from 'lwc';

export default class Boattilelwc extends LightningElement {

    @api
    boat;

    @api
    selectedId;

    get currentClass() {
        return `tile${this.boat && this.boat.Id === this.selectedId  ? " selected" : ""}`;
    }

    get pictureStyle() {
        return `background-image:url(${this.boat.Picture__c})`;
    }

    onClick() {
        // component event
        this.dispatchEvent(new CustomEvent("select", {
            detail: {
                boatId: this.boat.Id
            }
        }));
    }

}