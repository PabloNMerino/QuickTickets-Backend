import { Request, Response } from "express";
import Event from "../model/eventModel";
const { validationResult } = require("express-validator");
class EventController {

    async createEvent(req: Request, res: Response) {
        try {
          const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
          const newEvent = Event.create(req.body);
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
            return res.status(200).json(event);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async getAllEvents(req: Request, res: Response) {
        try {
            const allEvents = await Event.find();
            return res.status(200).json(allEvents);
          } catch (error) {
              res.status(500).json({ message: 'Server error', error });
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
          const event = await Event.findByIdAndUpdate(id, req.body);

          if(!event) {
            res.status(404).send(`Event with Id ${id} not found`)
          }

          return res.status(200).send(`Event with Id ${id} succesfully updated`)
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async getMyPostedEvents(req: Request, res: Response) {
      try {
        const userId = req.userId;
        console.log("ID: " + userId);
        const events = await Event.find({ creatorId: userId });
        return res.status(200).json(events);
      } catch (error) {
          res.status(500).json({ message: 'Server error', error });
      }
  }
}

export const eventController = new EventController();