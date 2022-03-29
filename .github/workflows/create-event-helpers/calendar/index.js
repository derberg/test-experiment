const { google } = require('googleapis')
const core = require('@actions/core');

module.exports = { addEvent, deleteEvent, listEvents }
  
const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/calendar'],
    credentials: JSON.parse(process.env.CALENDAR_SERVICE_ACCOUNT)
});

const calendar = google.calendar({ version: 'v3', auth });

/**
 * Adds new single-occuring event
 * All events are being linked to their GitHub issues
 * @param {String} zoomUrl Zoom url of the meeting
 * @param {String} startDate ex. 2022-04-05
 * @param {String} startTime ex. 08 or 16
 * @param {Number} issueNumber GitHub issue number of the event, to find event later
 */
async function addEvent(zoomUrl, startDate, startTime, issueNumber) {

    const communityIssuesUrl = 'https://github.com/asyncapi/community/issues/';
    const title = process.env.MEETING_NAME;
    const suffix = process.env.MEETING_NAME_SUFFIX;
    const description = process.env.MEETING_DESC;

    try {

        //helper to create end time which is always 1h later
        const getEndTime = (startTime) => {
            const time = Number(startTime);
            if (time < 10) return '0' + (time + 1)

            return (time + 1) + ''
        }

        //helper to build meeting description
        //there is a use case that meeting has no connection over zoom available as it is pure live stream
        const getDescription = (description, communityIssuesUrl, issueNumber, zoomUrl) => {

            const zoomDetails = zoomUrl && `<b>Zoom</b>: <a href="${zoomUrl}">Meeting Link</a>`;
            const agendaDetails = `<b>Agenda and more options to join the meeting</b>: <a href="${communityIssuesUrl}${issueNumber}">GitHub Issue Link.</a>`;

            return `${ description }<br><br>${ zoomDetails }<br><br>${ agendaDetails }`
        };

        await calendar.events.insert({
            calendarId: process.env.CALENDAR_ID,
            requestBody: {
                summary: `${title} ${suffix}`,
                description: getDescription(description, communityIssuesUrl, issueNumber, zoomUrl),
                start: {
                    dateTime: `${ startDate }T${ startTime }:00:00Z`
                },
                end: {
                    dateTime: `${ startDate }T${ getEndTime(startTime) }:00:00Z`
                },
                location: zoomUrl,
                extendedProperties: {
                    private: {
                        'ISSUE_ID': `${issueNumber}`
                    }
                }
            }
        })

        core.info('Event created')
    } catch (error) {
        core.setFailed(`Faild creating event in Google Calendar: ${ error }`)
    }
}

/**
 * Deletes a single-occuring event from issue number
 * @param {Number} issueNumber GitHub issue number of the meeting to delete
 * @param {Number} closeDate Date when issue was closed
 */
async function deleteEvent(issueNumber, closeDate) {
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

    if (eventsItems.length > 0) {

        const meetingId = eventsItems[0].id;
        const eventStartDate = new Date(eventsItems[0].start.dateTime);
        const issueCloseDate = new Date(closeDate);

        try {
            //in case of issue was closed after the event, we do not remove it from calendar
            if (eventStartDate.getTime() < issueCloseDate.getTime()) return core.info('Event not removed as related issue was closed after the event took place.');

            await calendar.events.delete({
                calendarId: process.env.CALENDAR_ID,
                eventId: meetingId
            })

            core.info('Event deleted from calendar')
        } catch (error) {
            core.setFailed(`Failed to delete event for issue number ${ issueNumber }: ${ error }`)
        }
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

        core.info(`List of all events: ${ response.data }`)
    } catch (error) {
        core.setFailed(`Faild fetching events from Google Calendar API: ${ error }`)
    }

    return response.data
}