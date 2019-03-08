import { LightningElement } from 'lwc';

export default class Boatsearchlwc extends LightningElement {
    onFormSubmit(event) {
        console.log(`-- Form Submit: ${JSON.stringify(event.detail)}`);
    }
}