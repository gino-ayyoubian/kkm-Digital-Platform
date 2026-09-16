const fs = require('fs');
let blueprint = JSON.parse(fs.readFileSync('firebase-blueprint.json', 'utf8'));

blueprint.entities["MeetingBooking"] = {
    "title": "Meeting Booking",
    "description": "Lead generation form for scheduling meetings at exhibitions.",
    "type": "object",
    "properties": {
        "name": { "type": "string", "maxLength": 100 },
        "organization": { "type": "string", "maxLength": 150 },
        "position": { "type": "string", "maxLength": 100 },
        "country": { "type": "string", "maxLength": 100 },
        "interest": { "type": "string", "maxLength": 200 },
        "preferredDate": { "type": "string", "maxLength": 50 },
        "message": { "type": "string", "maxLength": 1000 },
        "createdAt": { "type": "string", "format": "date-time" }
    },
    "required": ["name", "organization", "country", "createdAt"]
};

blueprint.firestore["/meetingBookings/{bookingId}"] = {
    "schema": "MeetingBooking",
    "description": "Stores meeting bookings submitted from the Exhibition page."
};

fs.writeFileSync('firebase-blueprint.json', JSON.stringify(blueprint, null, 2));
