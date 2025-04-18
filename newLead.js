import { LightningElement, track } from 'lwc';
import createLead from '@salesforce/apex/LeadController.createLead';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
 
export default class LeadCreator extends LightningElement {
    @track showModal = false;
   @track leadData = {
    FirstName: '',
    LastName: '',
    Company: '',
    Email: '',
    Phone: '',
    Status: 'Open - Not Contacted',
    Street: '',
    City: '',
    State: '',
    PostalCode: '',
    Country: '',
    Title: '',
    Website: '',
    Description: '',
    ProductInterest: '',
    CurrentGenerators: '',
    SICCode: '',
    Primary: '',
    NumberOfLocations: ''
};
 
yesNoOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
];
 
 
    statusOptions = [
        { label: 'Open - Not Contacted', value: 'Open - Not Contacted' },
        { label: 'Working - Contacted', value: 'Working - Contacted' },
        { label: 'Closed - Converted', value: 'Closed - Converted' },
        { label: 'Closed - Not Converted', value: 'Closed - Not Converted' }
    ];
 
    openModal() {
        this.showModal = true;
    }
 
    closeModal() {
        this.showModal = false;
    }
 
    handleChange(event) {
        const field = event.target.name;
        this.leadData[field] = event.target.value;
    }
 
    handleSave() {
        createLead({ leadRecord: this.leadData })
            .then(result => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success',
                    message: 'Record Saved Successfully',
                    variant: 'success'
                }));
                this.closeModal();
            })
            .catch(error => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'error'
                }));
            });
    }
}