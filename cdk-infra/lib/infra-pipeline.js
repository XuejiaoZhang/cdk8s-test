#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const codebuild = require("@aws-cdk/aws-codebuild");
const actions = require("@aws-cdk/aws-codepipeline-actions");
const pipeline_1 = require("./pipeline");
class IaCPipelineStack extends cdk.Stack {
    constructor(parent, name, props) {
        super(parent, name, props);
        const pipelineConstruct = new pipeline_1.CDKCfnPipeline(this, 'Pipeline', {
            pipelineName: 'infra-as-a-code',
            stackName: 'IaC',
            templateName: 'infra-as-a-code',
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
exports.IaCPipelineStack = IaCPipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mcmEtcGlwZWxpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmZyYS1waXBlbGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxQ0FBc0M7QUFDdEMsb0RBQXFEO0FBQ3JELDZEQUE4RDtBQUU5RCx5Q0FBNEM7QUFFNUMsTUFBYSxnQkFBaUIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUMzQyxZQUFZLE1BQWUsRUFBRSxJQUFZLEVBQUUsS0FBc0I7UUFDN0QsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFM0IsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLHlCQUFjLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUMzRCxZQUFZLEVBQUUsaUJBQWlCO1lBQy9CLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFlBQVksRUFBRSxpQkFBaUI7WUFDL0IsU0FBUyxFQUFFLFdBQVc7U0FDekIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxRQUFRLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxDQUFDO1FBRTVDLE1BQU0sWUFBWSxHQUFHLElBQUksU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ3JFLFNBQVMsRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLHlCQUF5QixDQUFDO1lBQzVFLFdBQVcsRUFBRTtnQkFDVCxVQUFVLEVBQUUsU0FBUyxDQUFDLGVBQWUsQ0FBQywwQkFBMEI7Z0JBQ2hFLG9CQUFvQixFQUFFO29CQUNsQixvQkFBb0IsRUFBRTt3QkFDbEIsS0FBSyxFQUFFLFdBQVc7cUJBQ3JCO2lCQUNKO2dCQUNELFVBQVUsRUFBRSxJQUFJO2FBQ25CO1NBQ0osQ0FBQyxDQUFDO1FBRUgsdURBQXVEO1FBQ3ZELGlCQUFpQjtRQUNqQiw4Q0FBOEM7UUFDOUMsNENBQTRDO1FBQzVDLGdEQUFnRDtRQUNoRCx3REFBd0Q7UUFDeEQsU0FBUztRQUNULHVCQUF1QjtRQUN2QixPQUFPO1FBQ1AsdURBQXVEO1FBQ3ZELHlEQUF5RDtRQUN6RCxpREFBaUQ7UUFDakQscUNBQXFDO1FBQ3JDLDZCQUE2QjtRQUM3QixvQ0FBb0M7UUFDcEMsVUFBVTtRQUNWLE9BQU87UUFFUCxNQUFNLFlBQVksR0FBRyxJQUFJLE9BQU8sQ0FBQyxlQUFlLENBQUM7WUFDN0MsVUFBVSxFQUFFLFFBQVE7WUFDcEIsT0FBTyxFQUFFLFlBQVk7WUFDckIsS0FBSyxFQUFFLGlCQUFpQixDQUFDLFlBQVk7U0FDeEMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLFFBQVEsQ0FBQztZQUNkLFNBQVMsRUFBRSxnQkFBZ0I7WUFDM0IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1NBQzFCLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQXRERCw0Q0FzREMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5pbXBvcnQgY2RrID0gcmVxdWlyZSgnQGF3cy1jZGsvY29yZScpO1xuaW1wb3J0IGNvZGVidWlsZCA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1jb2RlYnVpbGQnKTtcbmltcG9ydCBhY3Rpb25zID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWNvZGVwaXBlbGluZS1hY3Rpb25zJyk7XG5pbXBvcnQgaWFtID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWlhbScpO1xuaW1wb3J0IHsgQ0RLQ2ZuUGlwZWxpbmUgfSBmcm9tICcuL3BpcGVsaW5lJztcblxuZXhwb3J0IGNsYXNzIElhQ1BpcGVsaW5lU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudDogY2RrLkFwcCwgbmFtZTogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgICAgIHN1cGVyKHBhcmVudCwgbmFtZSwgcHJvcHMpO1xuXG4gICAgICAgIGNvbnN0IHBpcGVsaW5lQ29uc3RydWN0ID0gbmV3IENES0NmblBpcGVsaW5lKHRoaXMsICdQaXBlbGluZScsIHtcbiAgICAgICAgICAgIHBpcGVsaW5lTmFtZTogJ2luZnJhLWFzLWEtY29kZScsXG4gICAgICAgICAgICBzdGFja05hbWU6ICdJYUMnLFxuICAgICAgICAgICAgdGVtcGxhdGVOYW1lOiAnaW5mcmEtYXMtYS1jb2RlJyxcbiAgICAgICAgICAgIGRpcmVjdG9yeTogJ2Nkay1pbmZyYSdcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHBpcGVsaW5lID0gcGlwZWxpbmVDb25zdHJ1Y3QucGlwZWxpbmU7XG5cbiAgICAgICAgY29uc3QgYnVpbGRQcm9qZWN0ID0gbmV3IGNvZGVidWlsZC5QaXBlbGluZVByb2plY3QodGhpcywgJ0J1aWxkUHJvamVjdCcsIHtcbiAgICAgICAgICAgIGJ1aWxkU3BlYzogY29kZWJ1aWxkLkJ1aWxkU3BlYy5mcm9tU291cmNlRmlsZW5hbWUoJ2Nkay1pbmZyYS9idWlsZHNwZWMueW1sJyksXG4gICAgICAgICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICAgICAgICAgIGJ1aWxkSW1hZ2U6IGNvZGVidWlsZC5MaW51eEJ1aWxkSW1hZ2UuVUJVTlRVXzE0XzA0X05PREVKU18xMF8xXzAsXG4gICAgICAgICAgICAgICAgZW52aXJvbm1lbnRWYXJpYWJsZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0FXU19ERUZBVUxUX1JFR0lPTic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndXMtZWFzdC0yJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwcml2aWxlZ2VkOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGxleFByb2plY3QuYWRkVG9Sb2xlUG9saWN5KG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgLy8gICAgIGFjdGlvbnM6IFtcbiAgICAgICAgLy8gICAgICAgICAnbGV4OlN0YXJ0SW1wb3J0JywgJ2xleDpHZXRJbXBvcnQnLFxuICAgICAgICAvLyAgICAgICAgICdsZXg6R2V0SW50ZW50JywgJ2xleDpQdXRJbnRlbnQnLFxuICAgICAgICAvLyAgICAgICAgICdsZXg6R2V0U2xvdFR5cGUnLCAnbGV4OlB1dFNsb3RUeXBlJyxcbiAgICAgICAgLy8gICAgICAgICAnbGV4OkdldEJvdCcsICdsZXg6UHV0Qm90JywgJ2xleDpQdXRCb3RBbGlhcydcbiAgICAgICAgLy8gICAgIF0sXG4gICAgICAgIC8vICAgICByZXNvdXJjZXM6IFtcIipcIl1cbiAgICAgICAgLy8gfSkpO1xuICAgICAgICAvLyBsZXhQcm9qZWN0LmFkZFRvUm9sZVBvbGljeShuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICAgIC8vICAgICBhY3Rpb25zOiBbJ2Nsb3VkZm9ybWF0aW9uOkRlc2NyaWJlU3RhY2tSZXNvdXJjZSddLFxuICAgICAgICAvLyAgICAgcmVzb3VyY2VzOiBbY2RrLlN0YWNrLm9mKHRoaXMpLmZvcm1hdEFybih7XG4gICAgICAgIC8vICAgICAgICAgc2VydmljZTogJ2Nsb3VkZm9ybWF0aW9uJyxcbiAgICAgICAgLy8gICAgICAgICByZXNvdXJjZTogJ3N0YWNrJyxcbiAgICAgICAgLy8gICAgICAgICByZXNvdXJjZU5hbWU6ICdIZWxsb0s4cyonXG4gICAgICAgIC8vICAgICB9KV1cbiAgICAgICAgLy8gfSkpO1xuXG4gICAgICAgIGNvbnN0IGRlcGxveUFjdGlvbiA9IG5ldyBhY3Rpb25zLkNvZGVCdWlsZEFjdGlvbih7XG4gICAgICAgICAgICBhY3Rpb25OYW1lOiAnRGVwbG95JyxcbiAgICAgICAgICAgIHByb2plY3Q6IGJ1aWxkUHJvamVjdCxcbiAgICAgICAgICAgIGlucHV0OiBwaXBlbGluZUNvbnN0cnVjdC5zb3VyY2VPdXRwdXRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcGlwZWxpbmUuYWRkU3RhZ2Uoe1xuICAgICAgICAgICAgc3RhZ2VOYW1lOiAnRGVwbG95SGVsbG9LOHMnLFxuICAgICAgICAgICAgYWN0aW9uczogW2RlcGxveUFjdGlvbl1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19