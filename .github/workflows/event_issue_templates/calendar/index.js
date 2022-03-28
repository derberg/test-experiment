const { google } = require('googleapis')
const core = require('@actions/core');

module.exports = { addEvent, deleteEvent, listEvents}

const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/calendar'],
    credentials: JSON.parse(process.env.CALENDAR_SERVICE_ACCOUNT)
});

const calendar = google.calendar({version: 'v3', auth});

/**
 * Adds new single-occuring event
 * All events are being linked to their GitHub issues
 * @param {String} title Title of the event
 * @param {String} description Description of the event
 * @param {String} zoomUrl Zoom url of the meeting
 * @param {String} startDate ex. 2022-04-05
 * @param {String} startTime ex. 08 or 16
 * @param {Number} issueNumber GitHub issue number of the event, to find event later
 */
async function addEvent(title, description, zoomUrl, startDate, startTime, issueNumber) {

    try {
        const communityIssuesUrl = 'https://github.com/asyncapi/community/issues/';
        const endTime = (startTime) => {
            const time = Number(startTime);
            if (time < 10) return '0' + (time + 1)
            
            return (time + 1) + ''
        }

        await calendar.events.insert({
            calendarId: process.env.CALENDAR_ID,
            requestBody: {
                summary: title,
                description: `${description}<br><b>Zoom</b>: <a href="${zoomUrl}">Meeting Link</a><br><b>Agenda</b>: <a href="${communityIssuesUrl}${issueNumber}">GitHub Issue Link.</a>`,
                start: {
                    dateTime: `${ startDate }T${ startTime }:00:00Z`
                },
                end: {
                    dateTime: `${ startDate }T${ endTime }:00:00Z`
                },
                location: zoomUrl,
                extendedProperties: {
                    private: {
                        'ISSUE_ID': `${issueNumber}`
                    }
                }
            }
        }) 
    } catch (error) {
        core.setFailed(`Faild creating event in Google Calendar: ${ error }`)
    }
    core.info('Event created')
}

/**
 * Deletes a single-occuring event from issue number
 * @param {Number} issueNumber GitHub issue number of the meeting to delete
 */
async function deleteEvent(issueNumber) {
    let events
    
    try {
        events = (await calendar.events.list({
            calendarId: process.env.CALENDAR_ID,
            privateExtendedProperty: `ISSUE_ID=${issueNumber}`
        })).data;
    } catch (error) {
        core.setFailed(`Failed to fetch events for issue numer ${ issueNumber }: ${ error }`)
    }
    
    const eventsItems = events.items;

    if ( eventsItems.length > 0 ) {

        try {
            await calendar.events.delete({
                calendarId: process.env.CALENDAR_ID,
                eventId: eventsItems[0].id
            })
        } catch (error) {
            core.setFailed(`Failed to delete event for issue number ${ issueNumber }: ${ error }`)
        }

        core.info('Event deleted from calendar')
    } else {
        core.info('Event not found in calendar')
    }
}

/**
 * Lists all events including single-occuring and recurring
 */
async function listEvents() {

    let response;

    try {
        response = await calendar.events.list({
        calendarId: process.env.CALENDAR_ID,
        timeMax: '2022-03-29T23:59:59Z',
        timeMin: '2022-03-26T00:00:00Z'
    })
    } catch (error) {
        core.setFailed(`Faild fetching events from Google Calendar API: ${ error }`)
    }
    core.info(`List of all events: ${ response.data }`)
    return response.data
}

(async () => {
    await addEvent('Test Recurring meeting', 'This meeting is for testing purposes.', 'https://zoom.com', '2022-03-30T16:00:00Z', '2022-03-30T17:00:00Z', 302)
    //await deleteEvent(435)
    // let instance = (await listInstances('p1edvsmdvsmt6ouei2a04v8qio'))[0]
    // await updateInstance(instance, 1)
    //console.log(await listEvents())
})()