#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import codebuild = require('@aws-cdk/aws-codebuild');
import actions = require('@aws-cdk/aws-codepipeline-actions');
import iam = require('@aws-cdk/aws-iam');
import { CDKCfnPipeline } from './pipeline';

export class IaCPipelineStack extends cdk.Stack {
    constructor(parent: cdk.App, name: string, props?: cdk.StackProps) {
        super(parent, name, props);

        const pipelineConstruct = new CDKCfnPipeline(this, 'Pipeline', {
            pipelineName: 'infra-as-a-code',
            stackName: 'IaC',
            templateName: 'InfraStack',
            directory: 'cdk-infra'
        });
        const pipeline = pipelineConstruct.pipeline;

        const buildProject = new codebuild.PipelineProject(this, 'BuildProject', {
            buildSpec: codebuild.BuildSpec.fromSourceFilename('cdk-infra/buildspec.yml'),
            environment: {
                buildImage: codebuild.LinuxBuildImage.UBUNTU_14_04_NODEJS_10_1_0,
                environmentVariables: {
                    'AWS_DEFAULT_REGION': {
                        value: 'us-east-2'
                    }
                },
                privileged: true
            }
        });

        // lexProject.addToRolePolicy(new iam.PolicyStatement({
        //     actions: [
        //         'lex:StartImport', 'lex:GetImport',
        //         'lex:GetIntent', 'lex:PutIntent',
        //         'lex:GetSlotType', 'lex:PutSlotType',
        //         'lex:GetBot', 'lex:PutBot', 'lex:PutBotAlias'
        //     ],
        //     resources: ["*"]
        // }));
        // lexProject.addToRolePolicy(new iam.PolicyStatement({
        //     actions: ['cloudformation:DescribeStackResource'],
        //     resources: [cdk.Stack.of(this).formatArn({
        //         service: 'cloudformation',
        //         resource: 'stack',
        //         resourceName: 'HelloK8s*'
        //     })]
        // }));

        const deployAction = new actions.CodeBuildAction({
            actionName: 'Deploy',
            project: buildProject,
            input: pipelineConstruct.sourceOutput
        });

        pipeline.addStage({
            stageName: 'DeployHelloK8s',
            actions: [deployAction]
        });
    }
}
