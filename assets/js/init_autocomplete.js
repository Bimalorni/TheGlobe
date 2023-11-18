const initialize_autocomplete = () => {
  const autocompleteSource = locations.map((one) => {
    return {
      value: one["Office (Building code)"],
      label: one["Country Name_revised"],
      ...one,
    };
  });
  var searchedLongitude, searchedLatitude;

  $("#view-office-search-input")
    .autocomplete({
      minLength: 0,
      source: autocompleteSource,
      position: {
        my: "left bottom",
        at: "left top",
        collision: "fit flip",
        of: "#view-place-input-wrapper-div",
      },
      focus: function (event, ui) {
        $("#view-office-search-input").val(ui.item.label);
        return false;
      },
      select: function (event, ui) {
        $("#view-office-search-input").val(ui.item.label);
        $("#autocomplete-select-id").val(ui.item.value);
        searchedLongitude = ui.item["Longitude"];
        searchedLatitude = ui.item["Latitude"];
        map.flyTo({
          center: [searchedLongitude, searchedLatitude],
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
          zoom: FLY_ZOOM,
        });
        lastingSeconds = 0;
        if (currentPopup) currentPopup.remove();
        addPopup(ui.item);
        changeDisplayData(ui.item);
        // $( "#project-description" ).html( ui.item.desc );
        // $( "#project-icon" ).attr( "src", "images/" + ui.item.icon );

        return false;
      },
    })
    .autocomplete("instance")._renderItem = function (ul, item) {
    return $("<li>")
      .append("<div>" + item.label + "</div>")
      .appendTo(ul);
  };

  map.on("zoomend", () => {});
};

const init_air_travel_autocomplete = (data) => {
  const autocompleteData = data.map((one) => {
    return {
      label: one["route_title"],
      value: one["route_no"],
      ...one,
    };
  });
  $("#view-route-search-input")
    .autocomplete({
      minLength: 0,
      source: autocompleteData,
      position: {
        my: "left bottom",
        at: "left top",
        collision: "fit flip",
        of: "#view-place-input-wrapper-div",
      },
      // focus: function( event, ui ) {
      //   $( "#view-route-search-input").val( ui.item["route_title"] );
      //   return false;
      // },
      select: function (event, ui) {
        $("#view-route-search-input").val(ui.item["route_title"]);
        $("#autocomplete-select-id").val(ui.item["route_no"]);
        const lng_src = Number(ui.item["Long_src"]);
        const lng_dst = Number(ui.item["Long_dst"]);
        const lat_src = Number(ui.item["Lat_src"]);
        const lat_dst = Number(ui.item["Lat_dst"]);
        if (
          isNaN(lng_src) ||
          isNaN(lng_dst) ||
          isNaN(lat_src) ||
          isNaN(lat_dst)
        )
          return;
        const lng = (lng_src + lng_dst) / 2;
        const lat = (lat_src + lat_dst) / 2;
        console.log(ui.item);
        console.log(lng, lat);
        const popupPosition = new mapboxgl.LngLat(lng, lat);
        map.flyTo({
          center: [lng, lat],
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
          zoom: FLY_ZOOM,
        });
        lastingSeconds = 0;
        if (currentPopup) currentPopup.remove();
        addPopup("routes", ui.item, popupPosition);
        map.setFilter("routes-fill", ["==", "no", ui.item["route_no"]]);
        changeDisplayData(ui.item);
        // $( "#project-description" ).html( ui.item.desc );
        // $( "#project-icon" ).attr( "src", "images/" + ui.item.icon );

        return false;
      },
    })
    .autocomplete("instance")._renderItem = function (ul, item) {
    return $("<li>")
      .append("<div>" + item.label + "</div>")
      .appendTo(ul);
  };
};

const init_fleet_autocomplete = (data) => {
  const autocompleteData = data.map((one) => {
    return {
      label: one["Location Name"],
      value: one["fleet_no"],
      ...one,
    };
  });
  $("#view-fleet-search-input")
    .autocomplete({
      minLength: 0,
      source: autocompleteData,
      position: {
        my: "left bottom",
        at: "left top",
        collision: "fit flip",
        of: "#view-place-input-wrapper-div",
      },
      // focus: function( event, ui ) {
      //   $( "#view-route-search-input").val( ui.item["route_title"] );
      //   return false;
      // },
      select: function (event, ui) {
        $("#view-fleet-search-input").val(ui.item["Location"]);
        $("#autocomplete-select-id").val(ui.item["fleet_no"]);
        const lng = Number(ui.item["Longitude"]);
        const lat = Number(ui.item["Latitude"]);
        const popupPosition = new mapboxgl.LngLat(lng, lat);
        map.flyTo({
          center: [lng, lat],
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
          zoom: FLY_ZOOM,
        });
        lastingSeconds = 0;
        if (currentPopup) currentPopup.remove();
        addPopup("fleets", ui.item, popupPosition);
        changeDisplayData(ui.item);
        // $( "#project-description" ).html( ui.item.desc );
        // $( "#project-icon" ).attr( "src", "images/" + ui.item.icon );

        return false;
      },
    })
    .autocomplete("instance")._renderItem = function (ul, item) {
    return $("<li>")
      .append("<div>" + item.label + "</div>")
      .appendTo(ul);
  };
};
