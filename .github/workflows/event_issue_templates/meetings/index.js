const { writeFileSync } = require('fs');
const { parseDate } = require('../utils/date.js');

/**
 * @param {string} date Date as YYYY-MM-DD
 * @param {string} time Number that represents hour, 2-digit format
 * @param {string} core Entire core package helper
 * @param {string} getMeetingIssueContent Function that returns content of the meeting issue 
 * @param {string} zoom Link to zoom meeting
*/
module.exports = (date, time, core, getMeetingIssueContent, zoom) => {
    console.log('3')
    core.info(`Workflow triggered with the following hour ${time} and date ${date}`);
    console.log('4')
    const dateDetails = parseDate(`${ date }T${ time }:00:00Z`);
    console.log('5')
    core.info('This is how time and date looks like after parsing:');
    console.log('6')
    core.info(JSON.stringify(dateDetails));
    console.log('7')
    if (dateDetails === 'Invalid Date') core.setFailed('Invalid date of the event. Make sure that you provided correct hour of the meeting and date in a format described in the meeting input form.')
    console.log('8')
    const issueContent =  getMeetingIssueContent(dateDetails.hour, dateDetails.formattedDate, zoom);
    console.log('9')
    writeFileSync('content.md', issueContent, { encoding: 'utf8'});
    console.log('10')
    core.setOutput('formattedDate', dateDetails.formattedDate);
    core.setOutput('fullDate', dateDetails.fullDate);
    core.setOutput('hour', dateDetails.hour);
}