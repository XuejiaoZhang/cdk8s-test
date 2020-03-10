#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { IaCPipelineStack } from '../lib/infra-pipeline';

const app = new cdk.App();

new IaCPipelineStack(app, 'IaCPipeline');
app.synth();

