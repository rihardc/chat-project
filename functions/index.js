const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.sendNotifications = functions.database.ref('/messages/{messageId}').onWrite(function(event) {
	if ( event.data.previous.val() ) {
		return;
	}
	
	if ( !event.data.exists() ) {
		return;
	}
	
	const notification_snapshot = event.data;
	const payload = {
		notification: {
			title: 'Message added',
			body: notification_snapshot.val().message
		}
	};
	
	console.info(payload);
	
	return admin.database().ref('/tokens').once('value').then(function(data) {
		if ( !data.val()) {
			return;
		}
		
		const snapshot = data.val();
		const tokens = [];
		
		for (var key in snapshot) {
			tokens.push( snapshot[key].token);
		}
		return admin.messaging().sendToDevice(tokens, payload);
	});
});
