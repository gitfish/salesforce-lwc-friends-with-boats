public class BoatSearchResults {
    
    @AuraEnabled
    public static List<Boat__c> getBoats(String boatTypeId) {
        if(String.isNotBlank(boatTypeId)) {
            return [select Id,Name,Contact__r.Name,Picture__c,BoatType__c,Geolocation__latitude__s,Geolocation__longitude__s from Boat__c where BoatType__c = :boatTypeId];
        }
        return [select Id,Name,Contact__r.Name,Picture__c,BoatType__c,Geolocation__latitude__s,Geolocation__longitude__s from Boat__c];
    }
}