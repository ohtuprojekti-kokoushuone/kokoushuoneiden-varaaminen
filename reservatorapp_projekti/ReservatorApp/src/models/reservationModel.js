
class Reservation {

    // Generates reservation event from MS Outlook calandar JSON object
    // Currently included: subject, start, end, organizer, attendees, isCancelled
    constructor(msCalendarEvent) {
        this.id = msCalendarEvent.id;
        this.subject = msCalendarEvent.subject;
        this.start = msCalendarEvent.start;
        this.end = msCalendarEvent.end;
        this.organizer = msCalendarEvent.organizer;
        this.attendees = msCalendarEvent.attendees;
        this.isCancelled = msCalendarEvent.isCancelled;
    }

    toJSON() {
        return { id: this.id, subject: this.subject, start: this.start, end: this.end, organizer: this.organizer, attendees: this.attendees, isCancelled: this.isCancelled };
    }


}

module.exports = Reservation;



