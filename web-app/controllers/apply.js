'use strict';

var functions = require('../resources/functions');

var apply = {
    /** GET home page. */
    get: function (req, res) {
        /** If there are any messages in the session display them. */
        var messages = Object.assign({}, req.session.data.messages);

        /** Render the page */
        res.render('apply', {
            title: 'Demo - Automated loan application',
            sid: req.sessionID,
            messages: messages,
            currentQuote: global.config.sametext,
        });
    },

    /** POST home page. */
    post: function (req, res) {
        var sessionData = req.session.data;
        /** Verify if post body contains the user email, if not redirect to index */
        if (typeof req.body['username'] === 'undefined') {
            return functions.displayError(req, res, { clearSession: true, message: 'Invalid user email.' });
        }
        /**
         * Generate a user id based on the user email/id and keep it in the session
         * DO NOT pass it to the browser, you will use the sessionData.internalUserId to enroll/verify the user
         */
        sessionData.internalUserId = functions.getInternalUserId(req.body.username);
        var isMobile = global.functions.isMobile(req.headers['user-agent']);
        var textId = parseInt(req.body.textid);
        sessionData.device =  isMobile? 'mobile' : 'desktop';
        /** Check if the user has previous saved typing patterns */
        typingDnaClient.check(
            {
                userId: sessionData.internalUserId,
                textId: textId,
                device: sessionData.device ,
                type: ['diagram']
            },
            function (error, result) {
                if (error || result['count'] === undefined || result['success'] === 0) {
                    return functions.displayError(
                        req,
                        res,
                        { clearSession: true, message: 'Error checking user' + (result['message'] ? ': ' + result['message'] : '.') });
                }
                if (result['count'] === 0 && result['mobilecount'] === 0) {
                    req.session.isNewUser = true;
                }
                /** If thus is a mobile device check the mobilecount parameter. */
                if (isMobile) {
                    result['count'] = result['mobilecount'];
                }
                if (result['success'] === 1) {
                    sessionData.diagramCount = result.count;
                    req.session.save(function () {
                        if (result.count > 0) {
                            /** User is allready enrolled, redirect to verify. */
                            res.redirect('verify')
                        } else {
                            /** The user is not enrolled yet, redirect to enroll. */
                            res.redirect('enroll')
                        }
                    })
                }
            })
    }
};

module.exports = apply;
