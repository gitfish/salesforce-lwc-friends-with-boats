import { LightningElement, api } from 'lwc';

export default class Boatdetaillwc extends LightningElement {

    @api
    boat;

    @api
    fullDetailsVisible = false;

    get cardTitle() {
        return `${this.boat.Contact__r.Name}'s Boat`;
    }

    get imageStyle() {
        return `background-image: url('${this.boat.Picture__c}');`;
    }

    onFullDetails() {
        
    }

}