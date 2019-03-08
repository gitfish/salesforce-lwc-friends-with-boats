public class BoatSearchFormController {
	
    @AuraEnabled
    public static List<BoatType__c> getAllBoatTypes() {
        return [select Id,Name from BoatType__c];
    }
}