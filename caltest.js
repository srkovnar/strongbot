// Testing google calendar functionality before merging into main project.

/* Fetch Authentication details */
const { client_id, client_secret, refresh_token } = require("./calconfig.json");

/* Import google API and authentication */
const { google } = require("googleapis");
const { OAuth2 } = google.auth;

/* Instantiate main structures */
const oauth2_client = new OAuth2(client_id, client_secret);

oauth2_client.setCredentials({
    refresh_token: refresh_token // Comes from developers.google.com/oauthplayground. I think this determines which google account you're using.
});

const calendar = google.calendar({
    version: "v3",
    auth: oauth2_client
});

// TODO: Move the magic numbers.

const start_time = new Date();
start_time.setDate(start_time.getDay()+2); // Set the event for tomorrow.

const end_time = new Date();
end_time.setDate(end_time.getDay()+2);
end_time.setMinutes(end_time.getMinutes()+45); // End in 45 minutes.

const my_time_zone = "America/New_York";

console.log(`Start Time: ${start_time}`);
console.log(`End Time: ${end_time}`);
console.log(`Timezone: ${my_time_zone}`);

const event = {
    summary: "Meeting with Dave",
    location: "317 N Salisbury Rd, West Lafayette, IN 47906",
    description: "Meeting with Dave from Legal to talk about the new project.",
    start: {
        dateTime: start_time,
        timeZone: my_time_zone
    },
    end: {
        dateTime: end_time,
        timeZone: my_time_zone
    },
    colorId: 1 // There are 11 of these.
};
// This object is explained in the Google Calendar documentation; this implementation uses the bare minimum.

// Free/Busy Query (doesn't matter if you're okay with double-booking, so I'm skipping.)
// But, I'll leave it in, commented out.

calendar.freebusy.query({
    resource: {
        timeMin: start_time,
        timeMax: end_time,
        timeZone: my_time_zone,
        items: [// A list of calendars to check if busy. Add more if needed.
            {
                id: "primary"
            }
        ]
    }
}, (err, res) => { // This is the function for what to do with the query.
    if (err) return console.error("FreeBusy query error: ", err);

    // if you want, you can console.log(res) if you want to see the full contents.
    // res = results of the query.

    // Get events that overlap
    const events_array = res.data.calendars.primary.busy;
    //for (const calendar of res.data.calendars) {
    //    console.log(`Calendar: ${calendar}`);
    //}
    console.log(`Calendars: ${JSON.stringify(res.data.calendars, null, 4)}`);
    // TODO: Normally you'd want to do a for-loop for everything in res.data.calendars.

    if (events_array.length === 0) return calendar.events.insert({
        calendarId: "primary",
        resource: event // your event
    }, (err) => {
        if (err) return console.error("Calendar Event Creation error: ", err);

        return console.log("Calendar event created.");
    });

    // Only do this if the event array isn't empty (i.e. we're busy)
    console.log("Sorry, I'm busy");
});

// An alternative to the freebusy query is to just use calendar.insert.
// That would just add the event without querying anything.
