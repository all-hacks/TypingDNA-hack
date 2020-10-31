'use strict';

var unirest = require('unirest')
var url = "https://nasa-orix-2020-api.herokuapp.com/bst" 

/** GET final page. */
async function result(req, res) {
    /** If there is no session data redirect to index */
    if (!req.session || !req.session.data || !req.session.data.internalUserId) {
        return res.redirect(303, 'apply');
    }

    console.log(req.body);

    var industryLabel;
    switch (req.body['industry']) {
        case 'CONSTRUCTION':
            industryLabel = 1;
            break;
        case 'BUSINESS SERVICES':
            industryLabel = 0;
            break;
        case 'LAND TRANSPORT':
            industryLabel = 2;
            break;
        case 'TRADING & WHOLESALE':
            industryLabel = 3;
            break;
    }

    var data = {};
    data['Paid-up Capital'] = req.body['paid-up'];
    data['Loan Amount'] = req.body['amount'];
    data['Loan Tenure'] = req.body['tenure'];
    data['Non-Current Assets 2018'] = req.body['fa-2018'];
    data['Non-Current Assets 2019'] = req.body['fa-2019'];
    data['Current Assets 2018'] = req.body['ca-2018'];
    data['Current Assets 2019'] = req.body['ca-2019'];
    data['Total Assets 2018'] = parseInt(req.body['fa-2018']) + parseInt(req.body['ca-2018']);
    data['Total Assets 2019'] = parseInt(req.body['fa-2019']) + parseInt(req.body['ca-2019']);
    data['Current Liabilities 2018'] = req.body['cl-2018'];
    data['Current Liabilities 2019'] = req.body['cl-2019'];
    data['Total Liabilities 2018'] = req.body['tl-2018'];
    data['Total Liabilities 2019'] = req.body['tl-2019'];
    data['Share Capital 2018'] = req.body['sc-2018'];
    data['Share Capital 2019'] = req.body['sc-2019'];
    data['Retained Earnings 2018'] = req.body['re-2018'];
    data['Retained Earnings 2019'] = req.body['re-2019'];
    data['Networth 2018'] = req.body['n-2018'];
    data['Networth 2019'] = req.body['n-2019'];
    data['Revenue 2018'] = req.body['r-2018'];
    data['Revenue 2019'] = req.body['r-2019'];
    data['NPBT 2018'] = req.body['npbt-2018'];
    data['NPBT 2019'] = req.body['npbt-2019'];
    data['NPAT 2018'] = req.body['npat-2018'];
    data['NPAT 2019'] = req.body['npat-2019'];
    data['Industry_labels'] = industryLabel;
    //data[''] = req.body[''];

    console.log(data);

    var score = 0;

    await unirest
        .post(url)
        .headers({ 'Content-Type': 'application/json' })
        .send(JSON.stringify(JSON.stringify(data)))
        .then((res) => {
            console.log(res.body);
            score = Math.round(parseFloat(res.body.substring(1,6)*100));
            console.log(score);
        })

    let sessionData = req.session.data;
    /** Check session variables for the last authentication result and display them. */
    var loggedIn = (req.session && req.session.data.typingResult === 1);
    var lastResult = req.session.data.lastResult;
    var diagramCount = sessionData.diagramCount || 0;
    var device = sessionData.device || 'desktop';
    var resultColour = '#f8cd00';
    var showEnroll = false;
    if (score) {
        if (score > 75) {
            showEnroll = true;
        }
        if (score < 50) {
            resultColour = '#c70000'
        }
        else if (score >= 70) {
            resultColour = '#45bb64'
        }
    }
    res.render('result', {
        title: 'Result - Automated loan onboarding',
        coName: req.body['company-name'],
        industry: req.body['industry'],
        paidUp: req.body['paid-up'],
        amount: req.body['amount'],
        tenure: req.body['tenure'],
        score: score,
        sid: req.sessionID,
        loggedIn: loggedIn,
        lastResult: lastResult,
        diagramCount: diagramCount,
        device: device,
        resultColour: resultColour,
        showEnroll: showEnroll
    });
    //req.session.data = {};
}

module.exports = result;
