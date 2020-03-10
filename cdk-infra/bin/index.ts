#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { IaCPipelineStack } from '../lib/infra-pipeline';
import { InfraStack } from '../lib/infra-stack';

const app = new cdk.App();

new IaCPipelineStack(app, 'IaCPipeline');



new InfraStack(app, 'InfraStack', {
    env: { account: process.env['CDK_DEFAULT_ACCOUNT'], region: 'us-east-2' },
    tags: {
        project: "cdk8s-test"
    }
});

app.synth();

