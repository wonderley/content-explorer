// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Hey, I'm Blockchain Buddy. I'm a great way to discover content about blockchain! Would you like to see some content?`);
    // agent.context.set({
    //   name: 'BBWelcomeIntent-followup',
    // });
    agent.add(new Suggestion(`Show content`));
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function contentIntentHandler(agent) {
    agent.requestSource = agent.ACTIONS_ON_GOOGLE;
    // delete welcome context... still not deleting
    agent.context.delete('bbwelcomeintent-followup');
    const items = [
      {
        itemID: 0,
        channel: 'Hardcore Crypto',
        url: 'https://www.youtube.com/watch?v=pL1bFwXjvVQ',
        title: 'Vitalik Buterin Explains Ethereum',
        type: 'video',
      },
      {
        itemID: 1,
        channel: 'The Crypto Lark',
        url: 'https://www.youtube.com/watch?v=lqu9RawKISM',
        title: 'This Is How Ethereum Scales - Matic Network Crypto',
        type: 'video',
      },
      {
        itemID: 2,
        channel: 'Blockgeeks',
        url: 'https://www.youtube.com/watch?v=IsXvoYeJxKA',
        title: 'What is Ethereum? Beginners Video Guide',
        type: 'video',
      },
    ];
    console.log(JSON.stringify(agent.agentVersion));
    const context = agent.context.get('content-state');
    console.log(JSON.stringify(context));
    let itemIdx = (context 
                && context.parameters
                && context.parameters.itemIdx) || 0;
    const bFirstRequest = itemIdx === 0;
    itemIdx = itemIdx % items.length;
    if (bFirstRequest) {
      agent.add(`Here's some content related to Ethereum.`);
    } else {
      agent.add(`Here's more content related to Ethereum.`);
    }
    agent.context.set({
      name: 'content-state',
      parameters: {
        itemIdx: itemIdx + 1
      }
    });
    // agent.context.set({
    //   name: 'Showcontentintent-followup',
    // });
    const item = items[itemIdx];
    if (item.type === 'video') {
      handleVideo(agent, item);
    }
  }

  function endSession(agent) {
    agent.end('Thanks for using Blockchain Buddy.')
  }

  function handleVideo(agent, item) {
    const conv = agent.conv(); // Get Actions on Google library conv instance
    const hasScreen =
      conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    const hasAudio =
      conv.surface.capabilities.has('actions.capability.AUDIO_OUTPUT');
    const hasMediaPlayback = 
      conv.surface.capabilities.has('actions.capability.MEDIA_RESPONSE_AUDIO');
    const hasWebBrowser = 
      conv.surface.capabilities.has('actions.capability.WEB_BROWSER');
    const hasCustomStage =
      conv.surface.capabilities.has('actions.capability.CUSTOM_STAGE');
    if (hasScreen) {
      agent.add(new Card({
          title: `${item.title}`,
          imageUrl: ytThumbnailUrlForUrl(item.url),
          text: `${item.channel}`,
          buttonText: 'Watch video',
          buttonUrl: `${item.url}`,
        })
      );
      agent.add(new Suggestion(`Show more content`));
    } else {
      // speaker
      conv.ask(`From ${item.channel}: ${item.title}. Do you want to play the audio to this video?`);
      agent.add(conv);
    }
  }

  function playAudioForVideo(agent) {
    const conv = agent.conv();
    conv.ask(`Sorry, I can't do that yet.`);
    agent.add(conv);
    //contentIntentHandler(agent);
  }

  function ytThumbnailUrlForID(id) {
    // https://gist.github.com/protrolium/8831763
    return `http://img.youtube.com/vi/${id}/mqdefault.jpg`;
  }

  function ytIDForUrl(url) {
    if (!url) throw new Error('Invalid Url');
    const preceedingString = 'watch?v=';
    const index = url.indexOf(preceedingString);
    if (index === -1) throw new Error('No Url ID found');
    return url.substring(index + preceedingString.length);
  }

  function ytThumbnailUrlForUrl(url) {
    const id = ytIDForUrl(url);
    return ytThumbnailUrlForID(id);
  }

  // // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('BB Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Show content intent', contentIntentHandler);
  intentMap.set('Show content intent - yes', playAudioForVideo);
  intentMap.set('Show content intent - no', endSession);
  intentMap.set('BB Welcome Intent - yes', contentIntentHandler);
  intentMap.set('BB Welcome Intent - no', endSession);
  agent.handleRequest(intentMap);
});
