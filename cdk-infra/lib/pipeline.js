#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codebuild = require("@aws-cdk/aws-codebuild");
const codepipeline = require("@aws-cdk/aws-codepipeline");
const actions = require("@aws-cdk/aws-codepipeline-actions");
const cdk = require("@aws-cdk/core");
class CDKCfnPipeline extends cdk.Construct {
    constructor(parent, name, props) {
        super(parent, name);
        const pipeline = new codepipeline.Pipeline(this, 'Pipeline', {
            pipelineName: 'CDK-' + props.pipelineName,
        });
        this.pipeline = pipeline;
        // Source
        const githubAccessToken = cdk.SecretValue.secretsManager('github-personal-access-token');
        const sourceOutput = new codepipeline.Artifact('SourceArtifact');
        const sourceAction = new actions.GitHubSourceAction({
            actionName: 'GitHubSource',
            owner: 'XuejiaoZhang',
            repo: 'cdk8s-test',
            oauthToken: githubAccessToken,
            output: sourceOutput
        });
        pipeline.addStage({
            stageName: 'Source',
            actions: [sourceAction],
        });
        this.sourceOutput = sourceOutput;
        // Build
        const buildProject = new codebuild.PipelineProject(this, 'BuildProject', {
            buildSpec: codebuild.BuildSpec.fromSourceFilename(props.directory + '/buildspec.yml'),
            environment: {
                buildImage: codebuild.LinuxBuildImage.UBUNTU_14_04_NODEJS_10_1_0,
                environmentVariables: {
                    'ARTIFACTS_BUCKET': {
                        value: pipeline.artifactBucket.bucketName
                    }
                },
                privileged: true
            }
        });
        const buildArtifact = new codepipeline.Artifact('BuildArtifact');
        const buildAction = new actions.CodeBuildAction({
            actionName: 'CodeBuild',
            project: buildProject,
            input: sourceOutput,
            outputs: [buildArtifact],
        });
        pipeline.addStage({
            stageName: 'Build',
            actions: [buildAction],
        });
        // Test
        const templatePrefix = props.templateName; // InfraStack
        const testStackName = 'CDK' + props.stackName + 'Test';
        const changeSetName = 'StagedChangeSet';
        pipeline.addStage({
            stageName: 'Test',
            actions: [
                new actions.CloudFormationCreateUpdateStackAction({
                    actionName: 'CFN_Deploy',
                    stackName: 'InfraDeployStack',
                    templatePath: buildArtifact.atPath(templatePrefix + '.template.json'),
                    adminPermissions: true,
                    // parameterOverrides: {
                    //   [this.builtImage.paramName]: dockerBuildOutput.getParam('imageTag.json', 'imageTag'),
                    //   // ...this.builtImage.assing(dockerBuildOutput)
                    // },
                    extraInputs: [buildArtifact],
                })
                // new actions.CloudFormationCreateReplaceChangeSetAction({
                //     actionName: 'PrepareChangesTest',
                //     stackName: testStackName,
                //     changeSetName,
                //     runOrder: 1,
                //     adminPermissions: true,
                //     templatePath: buildArtifact.atPath(templatePrefix + '.template.json'),
                //     //templateConfiguration: buildArtifact.atPath('StackConfig.json'),
                // }),
                // new actions.CloudFormationExecuteChangeSetAction({
                //     actionName: 'ExecuteChangesTest',
                //     stackName: testStackName,
                //     changeSetName,
                //     runOrder: 2
                // })
            ],
        });
        // Prod
        const prodStackName = 'CDK' + props.stackName + 'Prod';
        pipeline.addStage({
            stageName: 'Prod',
            actions: [
                new actions.CloudFormationCreateReplaceChangeSetAction({
                    actionName: 'PrepareChangesProd',
                    stackName: prodStackName,
                    changeSetName,
                    runOrder: 1,
                    adminPermissions: true,
                    templatePath: buildArtifact.atPath(templatePrefix + '.template.yaml'),
                }),
                new actions.CloudFormationExecuteChangeSetAction({
                    actionName: 'ExecuteChangesProd',
                    stackName: prodStackName,
                    changeSetName,
                    runOrder: 2
                })
            ],
        });
    }
}
exports.CDKCfnPipeline = CDKCfnPipeline;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxvREFBcUQ7QUFDckQsMERBQTJEO0FBQzNELDZEQUE4RDtBQUM5RCxxQ0FBc0M7QUFTdEMsTUFBYSxjQUFlLFNBQVEsR0FBRyxDQUFDLFNBQVM7SUFLN0MsWUFBWSxNQUFxQixFQUFFLElBQVksRUFBRSxLQUEwQjtRQUN2RSxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXBCLE1BQU0sUUFBUSxHQUFHLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ3pELFlBQVksRUFBRSxNQUFNLEdBQUcsS0FBSyxDQUFDLFlBQVk7U0FDNUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFFekIsU0FBUztRQUNULE1BQU0saUJBQWlCLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUN6RixNQUFNLFlBQVksR0FBRyxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNqRSxNQUFNLFlBQVksR0FBRyxJQUFJLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQztZQUNoRCxVQUFVLEVBQUUsY0FBYztZQUMxQixLQUFLLEVBQUUsY0FBYztZQUNyQixJQUFJLEVBQUUsWUFBWTtZQUNsQixVQUFVLEVBQUUsaUJBQWlCO1lBQzdCLE1BQU0sRUFBRSxZQUFZO1NBQ3ZCLENBQUMsQ0FBQztRQUNILFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDZCxTQUFTLEVBQUUsUUFBUTtZQUNuQixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7U0FDMUIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFFakMsUUFBUTtRQUNSLE1BQU0sWUFBWSxHQUFHLElB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Q0FBQztJQUNQLENBQUM7Q0FDSjtBQXZIRCx3Q0F1SEMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5pbXBvcnQgY29kZWJ1aWxkID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWNvZGVidWlsZCcpO1xuaW1wb3J0IGNvZGVwaXBlbGluZSA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1jb2RlcGlwZWxpbmUnKTtcbmltcG9ydCBhY3Rpb25zID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWNvZGVwaXBlbGluZS1hY3Rpb25zJyk7XG5pbXBvcnQgY2RrID0gcmVxdWlyZSgnQGF3cy1jZGsvY29yZScpO1xuXG5leHBvcnQgaW50ZXJmYWNlIENES0NmblBpcGVsaW5lUHJvcHMge1xuICAgIHN0YWNrTmFtZTogc3RyaW5nO1xuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nO1xuICAgIHBpcGVsaW5lTmFtZTogc3RyaW5nO1xuICAgIGRpcmVjdG9yeTogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgQ0RLQ2ZuUGlwZWxpbmUgZXh0ZW5kcyBjZGsuQ29uc3RydWN0IHtcbiAgICBwdWJsaWMgcmVhZG9ubHkgcGlwZWxpbmU6IGNvZGVwaXBlbGluZS5QaXBlbGluZTtcblxuICAgIHB1YmxpYyByZWFkb25seSBzb3VyY2VPdXRwdXQ6IGNvZGVwaXBlbGluZS5BcnRpZmFjdDtcblxuICAgIGNvbnN0cnVjdG9yKHBhcmVudDogY2RrLkNvbnN0cnVjdCwgbmFtZTogc3RyaW5nLCBwcm9wczogQ0RLQ2ZuUGlwZWxpbmVQcm9wcykge1xuICAgICAgICBzdXBlcihwYXJlbnQsIG5hbWUpO1xuXG4gICAgICAgIGNvbnN0IHBpcGVsaW5lID0gbmV3IGNvZGVwaXBlbGluZS5QaXBlbGluZSh0aGlzLCAnUGlwZWxpbmUnLCB7XG4gICAgICAgICAgICBwaXBlbGluZU5hbWU6ICdDREstJyArIHByb3BzLnBpcGVsaW5lTmFtZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucGlwZWxpbmUgPSBwaXBlbGluZTtcblxuICAgICAgICAvLyBTb3VyY2VcbiAgICAgICAgY29uc3QgZ2l0aHViQWNjZXNzVG9rZW4gPSBjZGsuU2VjcmV0VmFsdWUuc2VjcmV0c01hbmFnZXIoJ2dpdGh1Yi1wZXJzb25hbC1hY2Nlc3MtdG9rZW4nKTtcbiAgICAgICAgY29uc3Qgc291cmNlT3V0cHV0ID0gbmV3IGNvZGVwaXBlbGluZS5BcnRpZmFjdCgnU291cmNlQXJ0aWZhY3QnKTtcbiAgICAgICAgY29uc3Qgc291cmNlQWN0aW9uID0gbmV3IGFjdGlvbnMuR2l0SHViU291cmNlQWN0aW9uKHtcbiAgICAgICAgICAgIGFjdGlvbk5hbWU6ICdHaXRIdWJTb3VyY2UnLFxuICAgICAgICAgICAgb3duZXI6ICdYdWVqaWFvWmhhbmcnLFxuICAgICAgICAgICAgcmVwbzogJ2NkazhzLXRlc3QnLFxuICAgICAgICAgICAgb2F1dGhUb2tlbjogZ2l0aHViQWNjZXNzVG9rZW4sXG4gICAgICAgICAgICBvdXRwdXQ6IHNvdXJjZU91dHB1dFxuICAgICAgICB9KTtcbiAgICAgICAgcGlwZWxpbmUuYWRkU3RhZ2Uoe1xuICAgICAgICAgICAgc3RhZ2VOYW1lOiAnU291cmNlJyxcbiAgICAgICAgICAgIGFjdGlvbnM6IFtzb3VyY2VBY3Rpb25dLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zb3VyY2VPdXRwdXQgPSBzb3VyY2VPdXRwdXQ7XG5cbiAgICAgICAgLy8gQnVpbGRcbiAgICAgICAgY29uc3QgYnVpbGRQcm9qZWN0ID0gbmV3IGNvZGVidWlsZC5QaXBlbGluZVByb2plY3QodGhpcywgJ0J1aWxkUHJvamVjdCcsIHtcbiAgICAgICAgICAgIGJ1aWxkU3BlYzogY29kZWJ1aWxkLkJ1aWxkU3BlYy5mcm9tU291cmNlRmlsZW5hbWUocHJvcHMuZGlyZWN0b3J5ICsgJy9idWlsZHNwZWMueW1sJyksXG4gICAgICAgICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICAgICAgICBidWlsZEltYWdlOiBjb2RlYnVpbGQuTGludXhCdWlsZEltYWdlLlVCVU5UVV8xNF8wNF9OT0RFSlNfMTBfMV8wLFxuICAgICAgICAgICAgICBlbnZpcm9ubWVudFZhcmlhYmxlczoge1xuICAgICAgICAgICAgICAgICdBUlRJRkFDVFNfQlVDS0VUJzoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcGlwZWxpbmUuYXJ0aWZhY3RCdWNrZXQuYnVja2V0TmFtZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgcHJpdmlsZWdlZDogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBidWlsZEFydGlmYWN0ID0gbmV3IGNvZGVwaXBlbGluZS5BcnRpZmFjdCgnQnVpbGRBcnRpZmFjdCcpO1xuICAgICAgICBjb25zdCBidWlsZEFjdGlvbiA9IG5ldyBhY3Rpb25zLkNvZGVCdWlsZEFjdGlvbih7XG4gICAgICAgICAgICBhY3Rpb25OYW1lOiAnQ29kZUJ1aWxkJyxcbiAgICAgICAgICAgIHByb2plY3Q6IGJ1aWxkUHJvamVjdCxcbiAgICAgICAgICAgIGlucHV0OiBzb3VyY2VPdXRwdXQsXG4gICAgICAgICAgICBvdXRwdXRzOiBbYnVpbGRBcnRpZmFjdF0sXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgcGlwZWxpbmUuYWRkU3RhZ2Uoe1xuICAgICAgICAgICAgc3RhZ2VOYW1lOiAnQnVpbGQnLFxuICAgICAgICAgICAgYWN0aW9uczogW2J1aWxkQWN0aW9uXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gVGVzdFxuICAgICAgICBjb25zdCB0ZW1wbGF0ZVByZWZpeCA9ICBwcm9wcy50ZW1wbGF0ZU5hbWU7IC8vIEluZnJhU3RhY2tcbiAgICAgICAgY29uc3QgdGVzdFN0YWNrTmFtZSA9ICdDREsnICsgcHJvcHMuc3RhY2tOYW1lICsgJ1Rlc3QnO1xuICAgICAgICBjb25zdCBjaGFuZ2VTZXROYW1lID0gJ1N0YWdlZENoYW5nZVNldCc7XG5cbiAgICAgICAgcGlwZWxpbmUuYWRkU3RhZ2Uoe1xuICAgICAgICAgICAgc3RhZ2VOYW1lOiAnVGVzdCcsXG4gICAgICAgICAgICBhY3Rpb25zOiBbXG5cblxuICAgICAgICAgICAgICAgIG5ldyBhY3Rpb25zLkNsb3VkRm9ybWF0aW9uQ3JlYXRlVXBkYXRlU3RhY2tBY3Rpb24oe1xuICAgICAgICAgICAgICAgICAgYWN0aW9uTmFtZTogJ0NGTl9EZXBsb3knLFxuICAgICAgICAgICAgICAgICAgc3RhY2tOYW1lOiAnSW5mcmFEZXBsb3lTdGFjaycsXG4gICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhdGg6IGJ1aWxkQXJ0aWZhY3QuYXRQYXRoKHRlbXBsYXRlUHJlZml4ICsgJy50ZW1wbGF0ZS5qc29uJyksXG4gICAgICAgICAgICAgICAgICBhZG1pblBlcm1pc3Npb25zOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgLy8gcGFyYW1ldGVyT3ZlcnJpZGVzOiB7XG4gICAgICAgICAgICAgICAgICAvLyAgIFt0aGlzLmJ1aWx0SW1hZ2UucGFyYW1OYW1lXTogZG9ja2VyQnVpbGRPdXRwdXQuZ2V0UGFyYW0oJ2ltYWdlVGFnLmpzb24nLCAnaW1hZ2VUYWcnKSxcbiAgICAgICAgICAgICAgICAgIC8vICAgLy8gLi4udGhpcy5idWlsdEltYWdlLmFzc2luZyhkb2NrZXJCdWlsZE91dHB1dClcbiAgICAgICAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICAgICAgICBleHRyYUlucHV0czogW2J1aWxkQXJ0aWZhY3RdLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vIG5ldyBhY3Rpb25zLkNsb3VkRm9ybWF0aW9uQ3JlYXRlUmVwbGFjZUNoYW5nZVNldEFjdGlvbih7XG4gICAgICAgICAgICAgICAgLy8gICAgIGFjdGlvbk5hbWU6ICdQcmVwYXJlQ2hhbmdlc1Rlc3QnLFxuICAgICAgICAgICAgICAgIC8vICAgICBzdGFja05hbWU6IHRlc3RTdGFja05hbWUsXG4gICAgICAgICAgICAgICAgLy8gICAgIGNoYW5nZVNldE5hbWUsXG4gICAgICAgICAgICAgICAgLy8gICAgIHJ1bk9yZGVyOiAxLFxuICAgICAgICAgICAgICAgIC8vICAgICBhZG1pblBlcm1pc3Npb25zOiB0cnVlLFxuICAgICAgICAgICAgICAgIC8vICAgICB0ZW1wbGF0ZVBhdGg6IGJ1aWxkQXJ0aWZhY3QuYXRQYXRoKHRlbXBsYXRlUHJlZml4ICsgJy50ZW1wbGF0ZS5qc29uJyksXG4gICAgICAgICAgICAgICAgLy8gICAgIC8vdGVtcGxhdGVDb25maWd1cmF0aW9uOiBidWlsZEFydGlmYWN0LmF0UGF0aCgnU3RhY2tDb25maWcuanNvbicpLFxuICAgICAgICAgICAgICAgIC8vIH0pLFxuICAgICAgICAgICAgICAgIC8vIG5ldyBhY3Rpb25zLkNsb3VkRm9ybWF0aW9uRXhlY3V0ZUNoYW5nZVNldEFjdGlvbih7XG4gICAgICAgICAgICAgICAgLy8gICAgIGFjdGlvbk5hbWU6ICdFeGVjdXRlQ2hhbmdlc1Rlc3QnLFxuICAgICAgICAgICAgICAgIC8vICAgICBzdGFja05hbWU6IHRlc3RTdGFja05hbWUsXG4gICAgICAgICAgICAgICAgLy8gICAgIGNoYW5nZVNldE5hbWUsXG4gICAgICAgICAgICAgICAgLy8gICAgIHJ1bk9yZGVyOiAyXG4gICAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFByb2RcbiAgICAgICAgY29uc3QgcHJvZFN0YWNrTmFtZSA9ICdDREsnICsgcHJvcHMuc3RhY2tOYW1lICsgJ1Byb2QnO1xuXG4gICAgICAgIHBpcGVsaW5lLmFkZFN0YWdlKHtcbiAgICAgICAgICAgIHN0YWdlTmFtZTogJ1Byb2QnLFxuICAgICAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICAgICAgIG5ldyBhY3Rpb25zLkNsb3VkRm9ybWF0aW9uQ3JlYXRlUmVwbGFjZUNoYW5nZVNldEFjdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbk5hbWU6ICdQcmVwYXJlQ2hhbmdlc1Byb2QnLFxuICAgICAgICAgICAgICAgICAgICBzdGFja05hbWU6IHByb2RTdGFja05hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZVNldE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHJ1bk9yZGVyOiAxLFxuICAgICAgICAgICAgICAgICAgICBhZG1pblBlcm1pc3Npb25zOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhdGg6IGJ1aWxkQXJ0aWZhY3QuYXRQYXRoKHRlbXBsYXRlUHJlZml4ICsgJy50ZW1wbGF0ZS55YW1sJyksXG4gICAgICAgICAgICAgICAgICAgIC8vdGVtcGxhdGVDb25maWd1cmF0aW9uOiBidWlsZEFydGlmYWN0LmF0UGF0aCgnU3RhY2tDb25maWcuanNvbicpLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG5ldyBhY3Rpb25zLkNsb3VkRm9ybWF0aW9uRXhlY3V0ZUNoYW5nZVNldEFjdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbk5hbWU6ICdFeGVjdXRlQ2hhbmdlc1Byb2QnLFxuICAgICAgICAgICAgICAgICAgICBzdGFja05hbWU6IHByb2RTdGFja05hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZVNldE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHJ1bk9yZGVyOiAyXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pO1xuICAgIH1cbn0iXX0=