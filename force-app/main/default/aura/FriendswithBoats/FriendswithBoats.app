<aura:application extends="force:slds">
    <lightning:layout>
    	<lightning:layoutitem size="8" padding="around-small">
        	<c:boatsearchlwc></c:boatsearchlwc>
        </lightning:layoutitem>
        <lightning:layoutitem size="4" padding="around-small">
            <c:boatdetailslwc></c:boatdetailslwc>
            <c:Map />
        </lightning:layoutitem>
    </lightning:layout>
    
</aura:application>