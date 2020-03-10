#!/usr/bin/env node
import codepipeline = require('@aws-cdk/aws-codepipeline');
import cdk = require('@aws-cdk/core');
export interface CDKCfnPipelineProps {
    stackName: string;
    templateName: string;
    pipelineName: string;
    directory: string;
}
export declare class CDKCfnPipeline extends cdk.Construct {
    readonly pipeline: codepipeline.Pipeline;
    readonly sourceOutput: codepipeline.Artifact;
    constructor(parent: cdk.Construct, name: string, props: CDKCfnPipelineProps);
}
