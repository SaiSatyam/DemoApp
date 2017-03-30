import {Aurelia} from 'aurelia-framework'
import environment from './environment';

//Configure Bluebird Promises.
(<any>Promise).config({
  warnings: {
    wForgottenReturn: false
  }
});


//Initialize aurelia
export function configure(aurelia: Aurelia) 
{
  aurelia.use
    .standardConfiguration()
    .feature('resources').plugin('aurelia-http-client').plugin('aurelia-validation')
    .plugin('jquery-ui').plugin('moment').plugin('nprogress'); //3rd party plugins

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() =>
    aurelia.setRoot());           //Triggers default root file
}
