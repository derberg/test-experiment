const mailchimp = require('@mailchimp/mailchimp_marketing');
const core = require('@actions/core');
const htmlContent = require('./htmlContent.js');
const { listEvents } = require('../calendar/index.js');

/**
 * Listing events from Google Calendar and sending them to Newsletter subscribers. 
 * This code is not triggered separately in workflow, in 2 separate steps a GitHub actions have issues when doing code.setOutput with complex JSON in String.
 */
module.exports = async () => {

    const events = await listEvents();
    if (!events.length) return core.info('No events scheduled for next week so no email will be sent');
    core.info(`Formatted list of events: ${ JSON.stringify(events, null, 4) }`)

    let newCampaign;

    mailchimp.setConfig({
        apiKey: process.env.MAILCHIMP_API_KEY,
        server: 'us14'
    });

    try {
        newCampaign = await mailchimp.campaigns.create({
            type: 'regular',
            recipients: {
                list_id: '6ea3acecae'
            },
            settings: {
                subject_line: 'AsyncAPI meetings scheduled for next week.',
                preview_text: 'Check out what AsyncAPI meetings are scheduled for next week and learn how to join them.',
                title: `Meetings info - ${ new Date(Date.now()).toUTCString()}`,
                from_name: 'Fran Mendez',
                reply_to: 'info@asyncapi.io',
            }
        });
    } catch (error) {
        return core.setFailed(`Failed creating campaign: ${ JSON.stringify(error) }`);
    }

    try {
        await mailchimp.campaigns.setContent(newCampaign.id, { html: htmlContent(events) });
    } catch (error) {
        return core.setFailed(`Failed adding content to campaign: ${ JSON.stringify(error) }`);
    }

    try {
        await mailchimp.campaigns.send(newCampaign.id);
    } catch (error) {
        return core.setFailed(`Failed sending email: ${ JSON.stringify(error) }`);
    }

    core.info(`New email campaign created`);
}