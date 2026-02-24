const readline = require('readline');
const https = require('https');
const querystring = require('querystring');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("=== Spotify Refresh Token Generator ===");
console.log("1. Go to https://developer.spotify.com/dashboard/applications");
console.log("2. Create an app (or use existing one)");
console.log("3. Add 'http://localhost:3000/callback' to Redirect URIs in settings");
console.log("4. Copy Client ID and Client Secret\n");

rl.question('Enter Client ID: ', (clientId) => {
  rl.question('Enter Client Secret: ', (clientSecret) => {
    
    const scope = 'user-top-read';
    const redirect_uri = 'http://localhost:3000/callback';
    
    const authUrl = 'https://accounts.spotify.com/authorize?' + 
      querystring.stringify({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: redirect_uri,
      });

    console.log('\nPlease open this URL in your browser:');
    console.log(authUrl);
    console.log('\nAfter authorizing, you will be redirected to a URL like: http://localhost:3000/callback?code=...');
    
    rl.question('\nPaste the full redirected URL (or just the code): ', (urlOrCode) => {
      let code = urlOrCode;
      
      try {
        if (urlOrCode.includes('code=')) {
             // Handle case where user pastes full URL or just query string
             const urlString = urlOrCode.startsWith('http') ? urlOrCode : `http://localhost:3000/${urlOrCode.startsWith('/') ? '' : '/'}${urlOrCode}`;
             const url = new URL(urlString);
             code = url.searchParams.get('code');
        }
      } catch (e) {
        console.log("Could not parse URL, assuming input is the code itself.");
      }

      const postData = querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri,
      });

      const authOptions = {
        hostname: 'accounts.spotify.com',
        path: '/api/token',
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': postData.length
        }
      };

      const req = https.request(authOptions, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          const response = JSON.parse(data);
          if (response.refresh_token) {
            console.log('\nSUCCESS! Here are your environment variables:\n');
            console.log(`SPOTIFY_CLIENT_ID=${clientId}`);
            console.log(`SPOTIFY_CLIENT_SECRET=${clientSecret}`);
            console.log(`SPOTIFY_REFRESH_TOKEN=${response.refresh_token}`);
            console.log('\nAdd these to your .env.local file.');
          } else {
            console.error('\nError getting token:', response);
          }
          rl.close();
        });
      });

      req.on('error', (e) => {
        console.error(e);
        rl.close();
      });

      req.write(postData);
      req.end();
    });
  });
});
