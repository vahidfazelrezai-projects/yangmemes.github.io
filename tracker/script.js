const HANDLES = [
  'JoeBiden',
  'SenWarren',
  'BernieSanders',
  'PeteButtigieg',
  'KamalaHarris',
  'AndrewYang',
  'BetoORourke',
  'CoryBooker',
  'amyklobuchar',
  //'JulianCastro',
  //'SenGillibrand',
  //'TulsiGabbard',
  //'marwilliamson',
  //'JayInslee',
  //'Hickenlooper',
  //'BilldeBlasio',
  //'AndrewGillum',
  //'JohnDelaney',
  'realDonaldTrump',
];
$(document).ready(() => {
  $.get('https://api.yangmemes.com/followers', (data) => {
    data.sort((a, b) => (a.handle.toLowerCase() > b.handle.toLowerCase() ? 1 : -1));
    Plotly.newPlot(
      document.getElementById('plot'),
      data.map((d) => {
        d.data.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
        return {
          name: d.handle,
          x: d.data.map(p => p.timestamp).slice(1),
          y: d.data.map((p, i) => {
            if (i == 0) return 0;
            return (d.data[i].followers - d.data[i-1].followers)
              / (d.data[i].seconds - d.data[i-1].seconds) * 60 * 60;
          }).slice(1),
          type: 'scatter',
        }
      }).filter((d) => (HANDLES.indexOf(d.name) >= 0)),
      {
        title: 'New Twitter Followers Per Hour (UTC)',
        titlefont: {
          family: 'sans-serif',
        },
        hovermode:'closest',
        xaxis: {
          tickfont: {
            family: 'sans-serif',
          },
        },
        yaxis: {
          dtick: 500,
          tick0: 0,
          gridwidth: 1,
          hoverformat: '.1f',
          tickfont: {
            family: 'sans-serif',
          },
        },
      },
      {
        displayModeBar: true,
        displaylogo: false,
        responsive: true,
      },
    );
  });
});

