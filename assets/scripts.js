new Vue({
	el: '#app',

	data: {
		form: {
			email: '',
			beta: false,
		},
		loading: false,
		success: false,
		message: false,
	},

	mounted: function() {
		// retina.js
		retinajs();

		// chart
		var wrapper = document.getElementsByClassName('chart-wrapper')[0];
		wrapper.className.replace(/\loaded\b/, '');
		setTimeout(function() {
			wrapper.className += ' loaded';
		}, 500);

		// particles
		particlesJS.load("particles", "assets/particles.json");
	},

	methods: {
		emailSignup: function(e) {
			e.preventDefault();
			this.loading = true;

			var options = {
				jsonp: 'c',
			}

			this.$http.jsonp('https://metorik.us14.list-manage.com/subscribe/post-json?u=08245b7de774728865eaca274&id=5d2bffb74e&EMAIL=' + this.form.email, options).then(function(response) {
				var data = response.json();
				this.loading = false;
				this.success = data.result;
				this.message = data.msg;
			}, function(error) {
				this.success = 'error';
				this.message = 'Something went wrong! Sorry';
			});
		},

		tryAgain: function(e) {
			e.preventDefault();
			this.success = false;
			this.message = false;
		},

		tweetShare: function() {
			var text = 	"Metorik, an all-in-one analytics tool & dashboard for @woocommerce (via @metorikhq)";
			window.open('https://twitter.com/intent/tweet/?url=https://metorik.com&text=' + encodeURIComponent(text) + '&related=metorikhq,woocommerce', 'tweetshare', 'width=640,height=320');				
		}
	}

});