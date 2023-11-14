// At low zooms, complete a revolution every two minutes.
	const secondsPerRevolution = 50;
	// Above zoom level 5, do not rotate.
	const maxSpinZoom = 5;
	// Rotate at intermediate speeds between zoom levels 3 and 5.
	const slowSpinZoom = 3;
	
	const LASTING_SECONDS = 20;
	let userInteracting = false;
	let spinEnabled = true;
	function spinGlobe() {
		const zoom = map.getZoom();
		if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
			let distancePerSecond = 360 / secondsPerRevolution;
			if (zoom > slowSpinZoom) {
			// Slow spinning at higher zooms
				const zoomDif =
				(maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
				distancePerSecond *= zoomDif;
			}
			const center = map.getCenter();
			center.lng -= distancePerSecond;
			// Smoothly animate the map over one second.
			// When this animation is complete, it calls a 'moveend' event.
			map.easeTo({ center, duration: 1000, easing: (n) => n });
		}
	}
	var lastingSeconds = 0;
	function timeCount() {
		if(!spinEnabled) lastingSeconds ++;
		if(lastingSeconds == LASTING_SECONDS) {
			if(typeof locations == "undefined") window.location.assign('index.htm');
			spinEnabled = true;
			if(currentPopup) currentPopup.remove();
			map.flyTo({
				essential: true,
				zoom: INITIAL_ZOOM
			})
			if(!$("#toggle-layers-view-card").hasClass("d-none")) {
				$("#view-toggle-layer-btn").click();
			}
			if(!$("#top-flights-view-card").hasClass("d-none")) $("#view-top-flights-card-btn").click();
			$("#view-office-search-input").val("");
			$("#ui-id-1").hide();
			spinGlobe();
			flyHome();
			displayTotalValues();
			if(typeof classes != 'undefined') {
				init_chart(classes[classes.length - 1]);
			}
			lastingSeconds = 0;
		}
	}

	function init_rotation () {
		// Pause spinning on interaction
		setInterval(timeCount, 1000);
		map.on('mousedown', () => {
			lastingSeconds = 0;
			userInteracting = true;
			spinEnabled = false;
		});
		 
		// Restart spinning the globe when interaction is complete
		map.on('mouseup', () => {
			userInteracting = false;
			
		});
		 
		// These events account for cases where the mouse has moved
		// off the map, so 'mouseup' will not be fired.
		map.on('dragend', () => {
			userInteracting = false;
			lastingSeconds = 0;
			// spinGlobe();
		});
		map.on('pitchend', () => {
			userInteracting = false;
			// spinGlobe();
		});
		map.on('rotateend', () => {
			userInteracting = false;
			// spinGlobe();
		});
		 
		// When animation is complete, start spinning if there is no ongoing interaction
		map.on('moveend', () => {
			spinGlobe();
		});
		
		document.getElementById('btn-spin').addEventListener('click', (e) => {
			spinEnabled = !spinEnabled;
			if (spinEnabled) {
				spinGlobe();
				$(e.target).removeClass("bi-play").addClass('bi-pause');
			} else {
				map.stop(); // Immediately end ongoing animation
				$(e.target).removeClass("bi-pause").addClass('bi-play');
			}
		});
	} 
		
		
	 
	
	 