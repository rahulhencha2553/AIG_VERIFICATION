import { PropertyPhotos } from "./property-photos";
import { RouteVideo } from "./route-video";
import { VoiceDirections } from "./voice-directions";

export class AddressAllData {

    public  address = '';
	public  latitude = '';
	public  longitude = '';
	public  addressType = '';
	public  addressTypeImage = '';
	public  zipCode = '';
	public  blockCode = '';
	public  aigCode = '';
	public  landmark = '';
	public  voiceDirections !: VoiceDirections[];
	public  propertyPhotos !: PropertyPhotos[];
	public  routeVideo !: RouteVideo[];
}
