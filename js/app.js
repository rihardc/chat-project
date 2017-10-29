{
	const auth = firebase.auth();
	const messaging = firebase.messaging();
	const database = firebase.database();
	const notificationForm = document.getElementById('notification-form');
	const messages = [];
	
	//Listeners for events
	
	messaging.onTokenRefresh(handleTokenRefresh);
	notificationForm.addEventListener('submit', sendNotification);
	
	//Functions
	
	function getNotifications() {
		messaging.requestPermission()
			.then(function () {
				handleTokenRefresh();
			})
			.catch(function () {
				console.log('Permission not granted');
			})
	}
	
	function sendNotification(e) {
		e.preventDefault();
		const message = document.getElementById('notification-message').value;
		database.ref('/messages').push({
			message: message
		}).then(function () {
			document.getElementById('notification-message').value = '';
		})
	}
	
	function handleTokenRefresh() {
		return messaging.getToken()
			.then(function (token) {
				database.ref('/tokens').push({
					token: token
				})
			}).then(function () {
				console.log('Token added');
			})
	}
	
	function checkActiveToken() {
		messaging.getToken().then(function (token) {
			database.ref('/tokens').orderByChild('token').equalTo(token)
				.once('value').then(function (snapshot) {
				console.log('Current token: ' + token);
				if (snapshot.val()) {
					console.log('Token active');
				} else {
					getNotifications();
				}
			});
		})
	}
	
	function getMessages() {
		var messageDataRef = firebase.database().ref('messages');
		messageDataRef.once('value').then(function (snapshot) {
			snapshot.forEach(function (childSnapshot) {
				var message = childSnapshot.val().message;
				messages.push(message);
				$("#message").append("<p>" + message + "</p>");
			});
			checkMessages();
		});
	}
	
	function checkMessages() {
		var messagesDataRef = firebase.database().ref('/messages');
		messagesDataRef.limitToLast(1).on('child_added', function(snapshot) {
			var message = snapshot.val().message;
			
			function isInArray(value, array) {
				return array.indexOf(value) > -1;
			}
			
			if (isInArray(message, messages)) {
				return;
			} else {
				$("#message").append("<p>" + message + "</p>");
			}
		});
	}
	
	
	checkActiveToken();
	getMessages();
}
