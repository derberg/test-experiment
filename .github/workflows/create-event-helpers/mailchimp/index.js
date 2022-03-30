const mailchimp = require('@mailchimp/mailchimp_marketing');
const core = require('@actions/core');
const htmlContent = require('./htmlContent.js');

/**
 * @param {string} events List of events in a string in format "[{\"title\":\"Community Meeting \",\"issueId\":\"143\",\"date\":\"Tue, 05 Apr 2022 16:00:00 GMT\"},{\"title\":\"Let's talk about contributing - Website\",\"issueId\":\"144\",\"date\":\"Mon, 04 Apr 2022 18:00:00 GMT\"}]"
 */
module.exports = async(events) => {

    const parsedList = JSON.parse(events);

    if (!parsedList.length) return core.info('No events scheduled for next week so no email will be sent');

    let newCampaign;

    mailchimp.setConfig({
        apiKey: process.env.MAILCHIMP_API_KEY,
        server: process.env.MAILCHIMP_SERVER_PREFIX
    });

    try {
        newCampaign = await mailchimp.campaigns.create({
            type: "regular",
            recipients: {
                list_id: process.env.MAILCHIMP_RECIPIENTS
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
        core.setFailed(`Failed creating campaign: ${ JSON.stringify(error) }`)
    }

    try {
        await mailchimp.campaigns.setContent(newCampaign.id, { html: htmlContent(parsedList) });
    } catch (error) {
        core.setFailed(`Failed adding content to campaign: ${ JSON.stringify(error) }`)
    }

    try {
        await mailchimp.campaigns.send(newCampaign.id);

    } catch (error) {
        core.setFailed(`Failed sending email: ${ JSON.stringify(error) }`)
    }

    core.info(`New email campaign created`);
}