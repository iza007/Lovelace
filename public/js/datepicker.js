const getDate = ( element ) => {
  var date;
  try {
    date = $.datepicker.parseDate( dateFormat, element.value );
  } catch( error ) {
    date = null;
  }
  return date;
}

const setDatepickerPos = (input, inst) => {
  var rect = input.getBoundingClientRect();
  setTimeout(function () {
      var scrollTop = $("body").scrollTop();
    inst.dpDiv.css({ top: rect.top + input.offsetHeight + scrollTop });
  }, 0);
}

$( function() {
  
    var dateFormat = "mm/dd/yy",
      from = $( "#from" )
        .datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          numberOfMonths: 1,
          inline: true,
          beforeShow: function (input, inst) { setDatepickerPos(input, inst) },
        })
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
        }),
      to = $( "#to" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1,
        inline: true,
        beforeShow: function (input, inst) { setDatepickerPos(input, inst) },
      })
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
      })

      // data = $( "#date" ).datepicker({
      //   defaultDate: "+1w",
      //   changeMonth: true,
      //   numberOfMonths: 1,
      //   inline: true,
      //   beforeShow: function (input, inst) { setDatepickerPos(input, inst) },
      // }).on( "change", function() {
      //   to.datepicker( "option", "minDate", getDate( this ) );
      // });

  } )

  $( function() {
    $( "#date" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 1,
      inline: true,
      dateFormat: "mm/dd/yy",
      beforeShow: function (input, inst) { setDatepickerPos(input, inst) },
    });
  } );