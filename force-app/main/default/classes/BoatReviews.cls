public class BoatReviews {
	
    @AuraEnabled
    public static List<BoatReview__c> getAll(ID boatId) {
        return [select Id,Name,Comment__c,Rating__c,LastModifiedDate,CreatedDate,CreatedBy.Name,CreatedBy.SmallPhotoUrl,CreatedBy.CompanyName from BoatReview__c where Boat__c = :boatId];
    }
}