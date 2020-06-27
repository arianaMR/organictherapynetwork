import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import env from '../config/environment/env';

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: env.AZURE_INSIGHTS_INSTRUMENTATION_KEY,
    setSendLiveMetrics: true,
  },
});
appInsights.loadAppInsights();

export default appInsights;
