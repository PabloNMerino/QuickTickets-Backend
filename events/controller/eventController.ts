import { Request, Response } from "express";
import Event from "../model/eventModel";
import User from "../../users/model/userModel"
const { validationResult } = require("express-validator");
import { emailService } from "../../email/service/emailService";
import schedule from "node-schedule"
import { eventService } from "../service/eventService";
import { DateTime } from "luxon";
class EventController {

    async createEvent(req: Request, res: Response) {
        try {
          const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

          const userId = req.userId;
          const user = await User.findById(userId, 'first_name last_name imageUrl');

          const newEvent = await Event.create({
             ...req.body,
            creatorFullName: `${user?.first_name} ${user?.last_name}`,
            creatorImageUrl: user?.imageUrl 
            });
            
          const eventId = newEvent.id;
          const { dateTime } = req.body;
          const eventDateModified = new Date(dateTime);
          eventDateModified.setHours(eventDateModified.getHours() + 1);
          
          schedule.scheduleJob(eventDateModified, function () {
            eventService.deleteScheduledEvent(eventId);
        });

        const location = req.body.location;
        const [eState, eCountry] = location.split(',').map((part: string) => part.trim().toLowerCase());
        
        const users = await User.find({
          state: eState,
          country: eCountry,
          is_subscribed: true
      })

      if(users.length>0) {
        users.map(user=>{
          emailService.sendEmailToSubscribers(user.email, req.body.name, req.body.description, req.body.dateTime);
        })
      }
          return res.status(201).send('Event succesfully created');
        } catch (error) {
          res.status(500).json({ message: 'Server error', error });
        }
    }

    async getEventById(req: Request, res: Response) {
        const { id } = req.params;
      
        try{
            const event = await Event.findById(id);
            if(!event) {
                return res.status(404).json({message: `Event id ${id} not found`})
            }

          const timeZone = 'America/Argentina/Buenos_Aires';

          const eventWithLocalTime = {
            ...event.toObject(),
            dateTime: DateTime.fromJSDate(event.dateTime).setZone(timeZone).toISO(),
          };
            return res.status(200).json(eventWithLocalTime);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async getAllEvents(req: Request, res: Response) {
        try {
          const allEvents = await Event.find({ is_active: true });
          const timeZone = 'America/Argentina/Buenos_Aires';

          const eventsWithLocalTime = allEvents.map(event => {
            return {
              ...event.toObject(),
              dateTime: DateTime.fromJSDate(event.dateTime).setZone(timeZone).toISO(),
            };
          });
            return res.status(200).json(eventsWithLocalTime);
          } catch (error) {
              res.status(500).json({ message: 'Server error', error });
          }
    }

    async getAllPausedEvents(req: Request, res: Response) {
      try {
          const allEvents = await Event.find({ is_active: false });
          const timeZone = 'America/Argentina/Buenos_Aires';

          const eventsWithLocalTime = allEvents.map(event => {
            return {
              ...event.toObject(),
              dateTime: DateTime.fromJSDate(event.dateTime).setZone(timeZone).toISO(),
            };
          });
          return res.status(200).json(eventsWithLocalTime);
        } catch (error) {
            res.status(500).json({ message: error });
        }
  }

    async deleteEvent(req: Request, res: Response) {
        const { id } = req.params;
        try {
          const event = await Event.findByIdAndDelete(id);
          if(!event) {
            res.status(404).send(`Event with Id ${id} not found`)
          }
          return res.status(200).send(`Event with Id ${id} succesfully deleted`)
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }


    async updateEvent(req: Request, res: Response) {
      const { id } = req.params;
      try {
        const errors = validationResult(req);
          if(!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
          }
        const event = await Event.findByIdAndUpdate(id, req.body , {new:true});

        if (!event) {
          return res.status(404).json({ message: `Event with Id ${id} not found` });
        }

        return res.status(200).json({
          message: `Event with Id ${id} successfully updated`,
          event,
        });

      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
  }

    async getMyPostedEvents(req: Request, res: Response) {
      try {
        const userId = req.userId;
        console.log("ID: " + userId);
        const events = await Event.find({ creatorId: userId });

        const timeZone = 'America/Argentina/Buenos_Aires';

        const eventsWithLocalTime = events.map(event => {
          return {
            ...event.toObject(),
            dateTime: DateTime.fromJSDate(event.dateTime).setZone(timeZone).toISO(),
          };
        });

        return res.status(200).json(eventsWithLocalTime);
      } catch (error) {
          res.status(500).json({ message: 'Server error', error });
      }
  }

  async toggleEventStatus(req: Request, res: Response) {
    const { eventId } = req.body;
    
    try {
        const event = await Event.findById(eventId);
        const userCreator = await User.findById(event?.creatorId);
        if (!event) {
            return res.status(404).send("Event not found");
        }

        event.is_active = !event.is_active;

        await event.save();
        if(userCreator!=null) {
          emailService.sendUserEventStatusEmail(userCreator.email, event.is_active, event.name)
        }
        const status = event.is_active ? "active" : "paused";
        return res.status(200).send(`${event.name} is now ${status}`);
    } catch (error) {
        console.error(error);
        return res.status(500).send("An error occurred while toggling the event status");
    }
  }

  async getEventsByCategoryName(req: Request, res: Response) {
    try {
      const { categoryName } = req.params;
      const events = await Event.find({ category: categoryName });

      const timeZone = 'America/Argentina/Buenos_Aires';

      const eventsWithLocalTime = events.map(event => {
        return {
          ...event.toObject(),
          dateTime: DateTime.fromJSDate(event.dateTime).setZone(timeZone).toISO(),
        };
      });
      return res.status(200).json(eventsWithLocalTime);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

async getEventsByDateRange(req: Request, res: Response) {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Both startDate and endDate are required." });
  }

        const start = new Date(startDate as string);
        const end = new Date(endDate as string);

    const events = await Event.find({
      dateTime: { $gte: start, $lte: end },
    });

    const timeZone = 'America/Argentina/Buenos_Aires';

    const eventsWithLocalTime = events.map(event => {
      return {
        ...event.toObject(),
        dateTime: DateTime.fromJSDate(event.dateTime).setZone(timeZone).toISO(),
      };
    });
    return res.status(200).json(eventsWithLocalTime);
  } catch (error) {
      return res.status(500).json({ message: "An error occurred while fetching events." });
  }
}

async getAllFreeEvents(req: Request, res: Response) {
  try {
      const allEvents = await Event.find({ price: 0 });

      const timeZone = 'America/Argentina/Buenos_Aires';

      const eventsWithLocalTime = allEvents.map(event => {
        return {
          ...event.toObject(),
          dateTime: DateTime.fromJSDate(event.dateTime).setZone(timeZone).toISO(),
        };
      });
      return res.status(200).json(eventsWithLocalTime);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

async getAllPaidEvents(req: Request, res: Response) {
  try {
      const allEvents = await Event.find({ price: { $gt: 0 }});

      const timeZone = 'America/Argentina/Buenos_Aires';

      const eventsWithLocalTime = allEvents.map(event => {
        return {
          ...event.toObject(),
          dateTime: DateTime.fromJSDate(event.dateTime).setZone(timeZone).toISO(),
        };
      });
      return res.status(200).json(eventsWithLocalTime);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

async getLastTenEvents(req: Request, res: Response) {
  try {
    const lastTenEvents = await Event.find()
      .sort({ createdAt: -1 })
      .limit(10);

    const timeZone = 'America/Argentina/Buenos_Aires';

    const eventsWithLocalTime = lastTenEvents.map(event => {
      return {
        ...event.toObject(),
        dateTime: DateTime.fromJSDate(event.dateTime).setZone(timeZone).toISO(),
      };
    });

    return res.status(200).json(eventsWithLocalTime);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred while fetching the last 10 events." });
  }
}

async  getEventsToday(req: Request, res: Response) {
  try {
    const todayStart = DateTime.now().startOf('day').toJSDate();
    const todayEnd = DateTime.now().endOf('day').toJSDate();

    const eventsToday = await Event.find({
      dateTime: {
        $gte: todayStart,
        $lte: todayEnd,
      }
    });

    const timeZone = 'America/Argentina/Buenos_Aires';

    const eventsWithLocalTime = eventsToday.map(event => {
      return {
        ...event.toObject(),
        dateTime: DateTime.fromJSDate(event.dateTime).setZone(timeZone).toISO(),
      };
    });

    return res.status(200).json(eventsWithLocalTime);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred while fetching today's events." });
  }
}

async getCreatorName(req: Request, res: Response) {
  const { eventId } = req.body;
  
  try {
    const event = await Event.findById(eventId,  `creatorId`);
    const user = await User.findById(event?.creatorId);
    return res.status(200).json({username: `${user?.first_name} ${user?.last_name}`})
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}
}

export const eventController = new EventController();