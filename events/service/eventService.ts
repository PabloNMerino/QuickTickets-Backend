import Event from "../model/eventModel";

class EventService {

    async checkAvailabilityAmount (eventId: String, ticketAmount: number) {
        try {
            const event = await Event.findById(eventId, 'availability');
            const availability = event?.availability;
            if(availability!=null) {
                if(availability>=ticketAmount) {
                    return true;
                } else {
                    return false;
                }
            } 
        } catch (error) {
            throw error;
        }
    }

    async discountAvailabilityAmount (eventId: String, ticketAmount: number) {
        try {
            const event = await Event.findById(eventId, 'availability');
            const availability = event?.availability;
            if(availability!=null) {
                const updatedAvailability = availability - ticketAmount;
                await Event.findByIdAndUpdate(eventId, {availability: updatedAvailability}, {new: true});
            } 
        } catch (error) {
            throw error;
        }
    }
}

export const eventService = new EventService();