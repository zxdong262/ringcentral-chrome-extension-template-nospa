/**
 * config sample file
 * use `cp config.sample.js config.js` to create a config
 *
 */
module.exports = {

  //// build options
  // minimize content.js
  // minimize: false

  // congfigs to build app

  //// ringcentral config

  ringCentralConfigs: {
    clientID: '',
    clientSecret: '',
    // your ringCentral app's Auth Server URL
    appServer: 'https://platform.devtest.ringcentral.com'
  },


  //// for third party related

  thirdPartyConfigs: {

    //service name, one word only, such as Insightly, RedTailCRM...
    serviceName: 'noname',

    // show call log sync desc form or not
    showCallLogSyncForm: true
  }

}




