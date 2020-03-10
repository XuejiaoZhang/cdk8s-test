#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const codebuild = require("@aws-cdk/aws-codebuild");
const actions = require("@aws-cdk/aws-codepipeline-actions");
const pipeline_1 = require("./pipeline");
class HelloK8sPipelineStack extends cdk.Stack {
    constructor(parent, name, props) {
        super(parent, name, props);
        const pipelineConstruct = new pipeline_1.CDKCfnPipeline(this, 'Pipeline', {
            pipelineName: 'hello-k8s',
            stackName: 'HelloK8s',
            templateName: 'HelloK8s',
            directory: 'hello-k8s'
        });
        const pipeline = pipelineConstruct.pipeline;
        const buildProject = new codebuild.PipelineProject(this, 'BuildProject', {
            buildSpec: codebuild.BuildSpec.fromSourceFilename('hello-kubernetes/buildspec.yml'),
            environment: {
                buildImage: codebuild.LinuxBuildImage.UBUNTU_14_04_NODEJS_10_1_0
            }
        });
        // TODO: 
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsbG8tazhzLXBpcGVsaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGVsbG8tazhzLXBpcGVsaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHFDQUFzQztBQUN0QyxvREFBcUQ7QUFDckQsNkRBQThEO0FBRTlELHlDQUE0QztBQUU1QyxNQUFNLHFCQUFzQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ3pDLFlBQVksTUFBZSxFQUFFLElBQVksRUFBRSxLQUFzQjtRQUM3RCxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUUzQixNQUFNLGlCQUFpQixHQUFHLElBQUkseUJBQWMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQzNELFlBQVksRUFBRSxXQUFXO1lBQ3pCLFNBQVMsRUFBRSxVQUFVO1lBQ3JCLFlBQVksRUFBRSxVQUFVO1lBQ3hCLFNBQVMsRUFBRSxXQUFXO1NBQ3pCLENBQUMsQ0FBQztRQUNILE1BQU0sUUFBUSxHQUFHLGlCQUFpQixDQUFDLFFBQVEsQ0FBQztRQUU1QyxNQUFNLFlBQVksR0FBRyxJQUFJLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUNyRSxTQUFTLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxnQ0FBZ0MsQ0FBQztZQUNuRixXQUFXLEVBQUU7Z0JBQ1QsVUFBVSxFQUFFLFNBQVMsQ0FBQyxlQUFlLENBQUMsMEJBQTBCO2FBQ25FO1NBQ0osQ0FBQyxDQUFDO1FBRVgsU0FBUztRQUNELHVEQUF1RDtRQUN2RCxpQkFBaUI7UUFDakIsOENBQThDO1FBQzlDLDRDQUE0QztRQUM1QyxnREFBZ0Q7UUFDaEQsd0RBQXdEO1FBQ3hELFNBQVM7UUFDVCx1QkFBdUI7UUFDdkIsT0FBTztRQUNQLHVEQUF1RDtRQUN2RCx5REFBeUQ7UUFDekQsaURBQWlEO1FBQ2pELHFDQUFxQztRQUNyQyw2QkFBNkI7UUFDN0Isb0NBQW9DO1FBQ3BDLFVBQVU7UUFDVixPQUFPO1FBRVAsTUFBTSxZQUFZLEdBQUcsSUFBSSxPQUFPLENBQUMsZUFBZSxDQUFDO1lBQzdDLFVBQVUsRUFBRSxRQUFRO1lBQ3BCLE9BQU8sRUFBRSxZQUFZO1lBQ3JCLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxZQUFZO1NBQ3hDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDZCxTQUFTLEVBQUUsZ0JBQWdCO1lBQzNCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztTQUMxQixDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5pbXBvcnQgY2RrID0gcmVxdWlyZSgnQGF3cy1jZGsvY29yZScpO1xuaW1wb3J0IGNvZGVidWlsZCA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1jb2RlYnVpbGQnKTtcbmltcG9ydCBhY3Rpb25zID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWNvZGVwaXBlbGluZS1hY3Rpb25zJyk7XG5pbXBvcnQgaWFtID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWlhbScpO1xuaW1wb3J0IHsgQ0RLQ2ZuUGlwZWxpbmUgfSBmcm9tICcuL3BpcGVsaW5lJztcblxuY2xhc3MgSGVsbG9LOHNQaXBlbGluZVN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQ6IGNkay5BcHAsIG5hbWU6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgICAgICBzdXBlcihwYXJlbnQsIG5hbWUsIHByb3BzKTtcblxuICAgICAgICBjb25zdCBwaXBlbGluZUNvbnN0cnVjdCA9IG5ldyBDREtDZm5QaXBlbGluZSh0aGlzLCAnUGlwZWxpbmUnLCB7XG4gICAgICAgICAgICBwaXBlbGluZU5hbWU6ICdoZWxsby1rOHMnLFxuICAgICAgICAgICAgc3RhY2tOYW1lOiAnSGVsbG9LOHMnLFxuICAgICAgICAgICAgdGVtcGxhdGVOYW1lOiAnSGVsbG9LOHMnLFxuICAgICAgICAgICAgZGlyZWN0b3J5OiAnaGVsbG8tazhzJ1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcGlwZWxpbmUgPSBwaXBlbGluZUNvbnN0cnVjdC5waXBlbGluZTtcblxuICAgICAgICBjb25zdCBidWlsZFByb2plY3QgPSBuZXcgY29kZWJ1aWxkLlBpcGVsaW5lUHJvamVjdCh0aGlzLCAnQnVpbGRQcm9qZWN0Jywge1xuICAgICAgICAgICAgYnVpbGRTcGVjOiBjb2RlYnVpbGQuQnVpbGRTcGVjLmZyb21Tb3VyY2VGaWxlbmFtZSgnaGVsbG8ta3ViZXJuZXRlcy9idWlsZHNwZWMueW1sJyksXG4gICAgICAgICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICAgICAgICAgIGJ1aWxkSW1hZ2U6IGNvZGVidWlsZC5MaW51eEJ1aWxkSW1hZ2UuVUJVTlRVXzE0XzA0X05PREVKU18xMF8xXzBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbi8vIFRPRE86IFxuICAgICAgICAvLyBsZXhQcm9qZWN0LmFkZFRvUm9sZVBvbGljeShuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICAgIC8vICAgICBhY3Rpb25zOiBbXG4gICAgICAgIC8vICAgICAgICAgJ2xleDpTdGFydEltcG9ydCcsICdsZXg6R2V0SW1wb3J0JyxcbiAgICAgICAgLy8gICAgICAgICAnbGV4OkdldEludGVudCcsICdsZXg6UHV0SW50ZW50JyxcbiAgICAgICAgLy8gICAgICAgICAnbGV4OkdldFNsb3RUeXBlJywgJ2xleDpQdXRTbG90VHlwZScsXG4gICAgICAgIC8vICAgICAgICAgJ2xleDpHZXRCb3QnLCAnbGV4OlB1dEJvdCcsICdsZXg6UHV0Qm90QWxpYXMnXG4gICAgICAgIC8vICAgICBdLFxuICAgICAgICAvLyAgICAgcmVzb3VyY2VzOiBbXCIqXCJdXG4gICAgICAgIC8vIH0pKTtcbiAgICAgICAgLy8gbGV4UHJvamVjdC5hZGRUb1JvbGVQb2xpY3kobmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICAvLyAgICAgYWN0aW9uczogWydjbG91ZGZvcm1hdGlvbjpEZXNjcmliZVN0YWNrUmVzb3VyY2UnXSxcbiAgICAgICAgLy8gICAgIHJlc291cmNlczogW2Nkay5TdGFjay5vZih0aGlzKS5mb3JtYXRBcm4oe1xuICAgICAgICAvLyAgICAgICAgIHNlcnZpY2U6ICdjbG91ZGZvcm1hdGlvbicsXG4gICAgICAgIC8vICAgICAgICAgcmVzb3VyY2U6ICdzdGFjaycsXG4gICAgICAgIC8vICAgICAgICAgcmVzb3VyY2VOYW1lOiAnSGVsbG9LOHMqJ1xuICAgICAgICAvLyAgICAgfSldXG4gICAgICAgIC8vIH0pKTtcblxuICAgICAgICBjb25zdCBkZXBsb3lBY3Rpb24gPSBuZXcgYWN0aW9ucy5Db2RlQnVpbGRBY3Rpb24oe1xuICAgICAgICAgICAgYWN0aW9uTmFtZTogJ0RlcGxveScsXG4gICAgICAgICAgICBwcm9qZWN0OiBidWlsZFByb2plY3QsXG4gICAgICAgICAgICBpbnB1dDogcGlwZWxpbmVDb25zdHJ1Y3Quc291cmNlT3V0cHV0XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBpcGVsaW5lLmFkZFN0YWdlKHtcbiAgICAgICAgICAgIHN0YWdlTmFtZTogJ0RlcGxveUhlbGxvSzhzJyxcbiAgICAgICAgICAgIGFjdGlvbnM6IFtkZXBsb3lBY3Rpb25dXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==