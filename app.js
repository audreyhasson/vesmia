var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var galaxyRouter = require('./routes/galaxy');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/galaxy', galaxyRouter);

// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.static('public'))

function getAccessToken(){ //return (accessToken, refreshToken)
  //get the access token
  const clientID = '3e2dcb2182d9492b8f6dedeb8aaad06e';
  const redirectURI = 'http://localhost:3000/galaxy&scope=user-top-read';
  const scope = ''; // Add the necessary scopes

  // Construct the authorization URL
  const authURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=code&redirect_uri=${encodeURIComponent(redirectURI)}&scope=${encodeURIComponent(scope)}`;

  // Redirect the user to the authorization URL
  window.location.href = authURL;


  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code'); // Get the authorization code

  if (code) {
    const tokenURL = 'https://accounts.spotify.com/api/token';
    const clientSecret = 'b10a3f4e3bdc4d6fa9ccb4d36bd41868';

    const data = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectURI,
    };

    const headers = {
      Authorization: `Basic ${btoa(`${clientID}:${clientSecret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    // Request the access token and refresh token
    fetch(tokenURL, {
      method: 'POST',
      body: new URLSearchParams(data),
      headers: headers,
    })
      .then(response => response.json())
      .then(data => {
        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;
        // You can now use the accessToken to make API requests to Spotify.
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
    return (accessToken, refreshToken);
};

function getRecs(accessToken, limit, seedTracks, seedArtists, targetEnergy, targetDanceability, 
                  targetValence, targetInstrumentalness){
  const recommendationsURL = 'https://api.spotify.com/v1/recommendations';
  const queryParams = new URLSearchParams({
    limit: limit,
    seed_tracks: seedTracks,
    seed_artists: seedArtists,
    target_energy: targetEnergy,
    target_danceability: targetDanceability,
    target_instrumentalness: targetInstrumentalness
  });

  const recommendationsURLWithParams = `${recommendationsURL}?${queryParams}`;

  fetch(recommendationsURLWithParams, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      // Handle the customized recommended songs data
      // Output:
      // [
      //   { name: 'Song 1', artist: 'Artist 1' },
      //   { name: 'Song 2', artist: 'Artist 2' },
      // ]
      console.log(data.tracks);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    return data.tracks
};

function refreshToken(refreshToken){ //returns (newAccessToken, newRefreshToken)
  const refreshToken = refreshToken; // Replace with your actual refresh token
  const clientID = '3e2dcb2182d9492b8f6dedeb8aaad06e';
  const clientSecret = 'b10a3f4e3bdc4d6fa9ccb4d36bd41868';

  // Construct the request to get a new access token
  const tokenURL = 'https://accounts.spotify.com/api/token';

  const data = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  };

  const headers = {
    Authorization: `Basic ${btoa(`${clientID}:${clientSecret}`)}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  // Request a new access token using the refresh token
  fetch(tokenURL, {
    method: 'POST',
    body: new URLSearchParams(data),
    headers: headers,
  })
    .then(response => response.json())
    .then(data => {
      const newAccessToken = data.access_token;
      const newRefreshToken = data.refresh_token; // Note: Some services may not return a new refresh token
      const expiresIn = data.expires_in; // The duration (in seconds) until the new token expires

      // Now you can use the new access token for API requests
      console.log(`New Access Token: ${newAccessToken}`);
      console.log(`New Refresh Token: ${newRefreshToken}`);
      console.log(`Expires In: ${expiresIn} seconds`);

      // You should save the new access token and refresh token for future use
    })
    .catch(error => {
      console.error('Error:', error);
    });
    return (newAccessToken, newRefreshToken);
};





