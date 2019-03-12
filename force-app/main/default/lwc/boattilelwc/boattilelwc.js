import { LightningElement, api } from 'lwc';

export default class Boattilelwc extends LightningElement {

    @api
    boat;

    @api
    selectedBoatId;

    @api
    get currentClass() {
        return `tile${this.selected ? " selected" : ""}`;
    }

    get pictureStyle() {
        return `background-image:url(${this.boat.Picture__c})`;
    }

    get selected() {
        return this.boat && this.boat.Id === this.selectedBoatId;
    }

    onBoatClick() {

    }

}