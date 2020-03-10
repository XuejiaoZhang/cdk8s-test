#!/usr/bin/env node
//import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { InfraStack } from '../lib/infra-stack';
//import { IaCPipelineStack } from '../lib/infra-pipeline';

const app = new cdk.App();
//new InfraStack(app, 'InfraStack');
new InfraStack(app, 'InfraStack', {
    env: { account: process.env['CDK_DEFAULT_ACCOUNT'], region: 'us-east-2' },
    tags: {
        project: "cdk8s-test"
    }
});
app.synth();




// const app = new cdk.App();
// new IaCPipelineStack(app, 'IaCPipeline');
// app.synth();

