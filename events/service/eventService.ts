import createHttpError from 'http-errors';
import Event from "../model/eventModel";

class EventService {

    async discountAvailabilityAmount (eventId: String, ticketAmount: number) {
        try {
            const event = await Event.findById(eventId, 'availability');
            const availability = event?.availability;
            if(availability!=null) {
                if(availability>=ticketAmount) {
                    const updatedAvailability = availability - ticketAmount;
                    await Event.findByIdAndUpdate(eventId, {availability: updatedAvailability}, {new: true});
                } else {
                    throw new createHttpError[400]('Insufficient availability');
                }
            } 
        } catch (error) {
            throw error;
        }
    }
}

export const eventService = new EventService();