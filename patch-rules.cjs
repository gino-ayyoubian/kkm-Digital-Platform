const fs = require('fs');
let rules = fs.readFileSync('firestore.rules', 'utf8');

// The rules file should have a place to insert the match block.
// I will append it inside the `match /databases/{database}/documents {` block.

const meetingMatch = `
    match /meetingBookings/{bookingId} {
      function isValidMeetingBooking(data) {
        return data.keys().hasAll(['name', 'organization', 'country', 'createdAt'])
            && data.keys().size() <= 8
            && data.name is string && data.name.size() <= 100
            && data.organization is string && data.organization.size() <= 150
            && data.country is string && data.country.size() <= 100
            && data.createdAt == request.time
            && (data.get('position', '') is string && data.get('position', '').size() <= 100)
            && (data.get('interest', '') is string && data.get('interest', '').size() <= 200)
            && (data.get('preferredDate', '') is string && data.get('preferredDate', '').size() <= 50)
            && (data.get('message', '') is string && data.get('message', '').size() <= 1000);
      }
      
      // Anyone can create a meeting booking (public form)
      allow create: if isValidMeetingBooking(request.resource.data);
      // Only admins can read/update/delete
      allow read, update, delete: if isAdmin();
    }
`;

// Insert just before the final `}`
rules = rules.replace(/}\s*$/, meetingMatch + "\n  }\n");

fs.writeFileSync('firestore.rules', rules);
