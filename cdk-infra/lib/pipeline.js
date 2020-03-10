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
        const templatePrefix = 'CDK' + props.templateName;
        const testStackName = 'CDK' + props.stackName + 'Test';
        const changeSetName = 'StagedChangeSet';
        pipeline.addStage({
            stageName: 'Test',
            actions: [
                new actions.CloudFormationCreateReplaceChangeSetAction({
                    actionName: 'PrepareChangesTest',
                    stackName: testStackName,
                    changeSetName,
                    runOrder: 1,
                    adminPermissions: true,
                    templatePath: buildArtifact.atPath(templatePrefix + 'Test.template.yaml'),
                    templateConfiguration: buildArtifact.atPath('StackConfig.json'),
                }),
                new actions.CloudFormationExecuteChangeSetAction({
                    actionName: 'ExecuteChangesTest',
                    stackName: testStackName,
                    changeSetName,
                    runOrder: 2
                })
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
                    templatePath: buildArtifact.atPath(templatePrefix + 'Prod.template.yaml'),
                    templateConfiguration: buildArtifact.atPath('StackConfig.json'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxvREFBcUQ7QUFDckQsMERBQTJEO0FBQzNELDZEQUE4RDtBQUM5RCxxQ0FBc0M7QUFTdEMsTUFBYSxjQUFlLFNBQVEsR0FBRyxDQUFDLFNBQVM7SUFLN0MsWUFBWSxNQUFxQixFQUFFLElBQVksRUFBRSxLQUEwQjtRQUN2RSxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXBCLE1BQU0sUUFBUSxHQUFHLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ3pELFlBQVksRUFBRSxNQUFNLEdBQUcsS0FBSyxDQUFDLFlBQVk7U0FDNUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFFekIsU0FBUztRQUNULE1BQU0saUJBQWlCLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUN6RixNQUFNLFlBQVksR0FBRyxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNqRSxNQUFNLFlBQVksR0FBRyxJQUFJLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQztZQUNoRCxVQUFVLEVBQUUsY0FBYztZQUMxQixLQUFLLEVBQUUsY0FBYztZQUNyQixJQUFJLEVBQUUsWUFBWTtZQUNsQixVQUFVLEVBQUUsaUJBQWlCO1lBQzdCLE1BQU0sRUFBRSxZQUFZO1NBQ3ZCLENBQUMsQ0FBQztRQUNILFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDZCxTQUFTLEVBQUUsUUFBUTtZQUNuQixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7U0FDMUIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFFakMsUUFBUTtRQUNSLE1BQU0sWUFBWSxHQUFHLElB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Iiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuaW1wb3J0IGNvZGVidWlsZCA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1jb2RlYnVpbGQnKTtcbmltcG9ydCBjb2RlcGlwZWxpbmUgPSByZXF1aXJlKCdAYXdzLWNkay9hd3MtY29kZXBpcGVsaW5lJyk7XG5pbXBvcnQgYWN0aW9ucyA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1jb2RlcGlwZWxpbmUtYWN0aW9ucycpO1xuaW1wb3J0IGNkayA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2NvcmUnKTtcblxuZXhwb3J0IGludGVyZmFjZSBDREtDZm5QaXBlbGluZVByb3BzIHtcbiAgICBzdGFja05hbWU6IHN0cmluZztcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZztcbiAgICBwaXBlbGluZU5hbWU6IHN0cmluZztcbiAgICBkaXJlY3Rvcnk6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIENES0NmblBpcGVsaW5lIGV4dGVuZHMgY2RrLkNvbnN0cnVjdCB7XG4gICAgcHVibGljIHJlYWRvbmx5IHBpcGVsaW5lOiBjb2RlcGlwZWxpbmUuUGlwZWxpbmU7XG5cbiAgICBwdWJsaWMgcmVhZG9ubHkgc291cmNlT3V0cHV0OiBjb2RlcGlwZWxpbmUuQXJ0aWZhY3Q7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQ6IGNkay5Db25zdHJ1Y3QsIG5hbWU6IHN0cmluZywgcHJvcHM6IENES0NmblBpcGVsaW5lUHJvcHMpIHtcbiAgICAgICAgc3VwZXIocGFyZW50LCBuYW1lKTtcblxuICAgICAgICBjb25zdCBwaXBlbGluZSA9IG5ldyBjb2RlcGlwZWxpbmUuUGlwZWxpbmUodGhpcywgJ1BpcGVsaW5lJywge1xuICAgICAgICAgICAgcGlwZWxpbmVOYW1lOiAnQ0RLLScgKyBwcm9wcy5waXBlbGluZU5hbWUsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBpcGVsaW5lID0gcGlwZWxpbmU7XG5cbiAgICAgICAgLy8gU291cmNlXG4gICAgICAgIGNvbnN0IGdpdGh1YkFjY2Vzc1Rva2VuID0gY2RrLlNlY3JldFZhbHVlLnNlY3JldHNNYW5hZ2VyKCdnaXRodWItcGVyc29uYWwtYWNjZXNzLXRva2VuJyk7XG4gICAgICAgIGNvbnN0IHNvdXJjZU91dHB1dCA9IG5ldyBjb2RlcGlwZWxpbmUuQXJ0aWZhY3QoJ1NvdXJjZUFydGlmYWN0Jyk7XG4gICAgICAgIGNvbnN0IHNvdXJjZUFjdGlvbiA9IG5ldyBhY3Rpb25zLkdpdEh1YlNvdXJjZUFjdGlvbih7XG4gICAgICAgICAgICBhY3Rpb25OYW1lOiAnR2l0SHViU291cmNlJyxcbiAgICAgICAgICAgIG93bmVyOiAnWHVlamlhb1poYW5nJyxcbiAgICAgICAgICAgIHJlcG86ICdjZGs4cy10ZXN0JyxcbiAgICAgICAgICAgIG9hdXRoVG9rZW46IGdpdGh1YkFjY2Vzc1Rva2VuLFxuICAgICAgICAgICAgb3V0cHV0OiBzb3VyY2VPdXRwdXRcbiAgICAgICAgfSk7XG4gICAgICAgIHBpcGVsaW5lLmFkZFN0YWdlKHtcbiAgICAgICAgICAgIHN0YWdlTmFtZTogJ1NvdXJjZScsXG4gICAgICAgICAgICBhY3Rpb25zOiBbc291cmNlQWN0aW9uXSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc291cmNlT3V0cHV0ID0gc291cmNlT3V0cHV0O1xuXG4gICAgICAgIC8vIEJ1aWxkXG4gICAgICAgIGNvbnN0IGJ1aWxkUHJvamVjdCA9IG5ldyBjb2RlYnVpbGQuUGlwZWxpbmVQcm9qZWN0KHRoaXMsICdCdWlsZFByb2plY3QnLCB7XG4gICAgICAgICAgICBidWlsZFNwZWM6IGNvZGVidWlsZC5CdWlsZFNwZWMuZnJvbVNvdXJjZUZpbGVuYW1lKHByb3BzLmRpcmVjdG9yeSArICcvYnVpbGRzcGVjLnltbCcpLFxuICAgICAgICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgICAgICAgYnVpbGRJbWFnZTogY29kZWJ1aWxkLkxpbnV4QnVpbGRJbWFnZS5VQlVOVFVfMTRfMDRfTk9ERUpTXzEwXzFfMCxcbiAgICAgICAgICAgICAgZW52aXJvbm1lbnRWYXJpYWJsZXM6IHtcbiAgICAgICAgICAgICAgICAnQVJUSUZBQ1RTX0JVQ0tFVCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHBpcGVsaW5lLmFydGlmYWN0QnVja2V0LmJ1Y2tldE5hbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHByaXZpbGVnZWQ6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgYnVpbGRBcnRpZmFjdCA9IG5ldyBjb2RlcGlwZWxpbmUuQXJ0aWZhY3QoJ0J1aWxkQXJ0aWZhY3QnKTtcbiAgICAgICAgY29uc3QgYnVpbGRBY3Rpb24gPSBuZXcgYWN0aW9ucy5Db2RlQnVpbGRBY3Rpb24oe1xuICAgICAgICAgICAgYWN0aW9uTmFtZTogJ0NvZGVCdWlsZCcsXG4gICAgICAgICAgICBwcm9qZWN0OiBidWlsZFByb2plY3QsXG4gICAgICAgICAgICBpbnB1dDogc291cmNlT3V0cHV0LFxuICAgICAgICAgICAgb3V0cHV0czogW2J1aWxkQXJ0aWZhY3RdLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIHBpcGVsaW5lLmFkZFN0YWdlKHtcbiAgICAgICAgICAgIHN0YWdlTmFtZTogJ0J1aWxkJyxcbiAgICAgICAgICAgIGFjdGlvbnM6IFtidWlsZEFjdGlvbl0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFRlc3RcbiAgICAgICAgY29uc3QgdGVtcGxhdGVQcmVmaXggPSAgJ0NESycgKyBwcm9wcy50ZW1wbGF0ZU5hbWU7XG4gICAgICAgIGNvbnN0IHRlc3RTdGFja05hbWUgPSAnQ0RLJyArIHByb3BzLnN0YWNrTmFtZSArICdUZXN0JztcbiAgICAgICAgY29uc3QgY2hhbmdlU2V0TmFtZSA9ICdTdGFnZWRDaGFuZ2VTZXQnO1xuXG4gICAgICAgIHBpcGVsaW5lLmFkZFN0YWdlKHtcbiAgICAgICAgICAgIHN0YWdlTmFtZTogJ1Rlc3QnLFxuICAgICAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICAgICAgIG5ldyBhY3Rpb25zLkNsb3VkRm9ybWF0aW9uQ3JlYXRlUmVwbGFjZUNoYW5nZVNldEFjdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbk5hbWU6ICdQcmVwYXJlQ2hhbmdlc1Rlc3QnLFxuICAgICAgICAgICAgICAgICAgICBzdGFja05hbWU6IHRlc3RTdGFja05hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZVNldE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHJ1bk9yZGVyOiAxLFxuICAgICAgICAgICAgICAgICAgICBhZG1pblBlcm1pc3Npb25zOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhdGg6IGJ1aWxkQXJ0aWZhY3QuYXRQYXRoKHRlbXBsYXRlUHJlZml4ICsgJ1Rlc3QudGVtcGxhdGUueWFtbCcpLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUNvbmZpZ3VyYXRpb246IGJ1aWxkQXJ0aWZhY3QuYXRQYXRoKCdTdGFja0NvbmZpZy5qc29uJyksXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgbmV3IGFjdGlvbnMuQ2xvdWRGb3JtYXRpb25FeGVjdXRlQ2hhbmdlU2V0QWN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uTmFtZTogJ0V4ZWN1dGVDaGFuZ2VzVGVzdCcsXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrTmFtZTogdGVzdFN0YWNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlU2V0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcnVuT3JkZXI6IDJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUHJvZFxuICAgICAgICBjb25zdCBwcm9kU3RhY2tOYW1lID0gJ0NESycgKyBwcm9wcy5zdGFja05hbWUgKyAnUHJvZCc7XG5cbiAgICAgICAgcGlwZWxpbmUuYWRkU3RhZ2Uoe1xuICAgICAgICAgICAgc3RhZ2VOYW1lOiAnUHJvZCcsXG4gICAgICAgICAgICBhY3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgbmV3IGFjdGlvbnMuQ2xvdWRGb3JtYXRpb25DcmVhdGVSZXBsYWNlQ2hhbmdlU2V0QWN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uTmFtZTogJ1ByZXBhcmVDaGFuZ2VzUHJvZCcsXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrTmFtZTogcHJvZFN0YWNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlU2V0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcnVuT3JkZXI6IDEsXG4gICAgICAgICAgICAgICAgICAgIGFkbWluUGVybWlzc2lvbnM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUGF0aDogYnVpbGRBcnRpZmFjdC5hdFBhdGgodGVtcGxhdGVQcmVmaXggKyAnUHJvZC50ZW1wbGF0ZS55YW1sJyksXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ29uZmlndXJhdGlvbjogYnVpbGRBcnRpZmFjdC5hdFBhdGgoJ1N0YWNrQ29uZmlnLmpzb24nKSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBuZXcgYWN0aW9ucy5DbG91ZEZvcm1hdGlvbkV4ZWN1dGVDaGFuZ2VTZXRBY3Rpb24oe1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb25OYW1lOiAnRXhlY3V0ZUNoYW5nZXNQcm9kJyxcbiAgICAgICAgICAgICAgICAgICAgc3RhY2tOYW1lOiBwcm9kU3RhY2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VTZXROYW1lLFxuICAgICAgICAgICAgICAgICAgICBydW5PcmRlcjogMlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICB9KTtcbiAgICB9XG59Il19