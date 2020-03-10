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
exports.IaCPipelineStack = IaCPipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mcmEtcGlwZWxpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmZyYS1waXBlbGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxQ0FBc0M7QUFDdEMsb0RBQXFEO0FBQ3JELDZEQUE4RDtBQUU5RCx5Q0FBNEM7QUFFNUMsTUFBYSxnQkFBaUIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUMzQyxZQUFZLE1BQWUsRUFBRSxJQUFZLEVBQUUsS0FBc0I7UUFDN0QsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFM0IsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLHlCQUFjLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUMzRCxZQUFZLEVBQUUsaUJBQWlCO1lBQy9CLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFlBQVksRUFBRSxZQUFZO1lBQzFCLFNBQVMsRUFBRSxXQUFXO1NBQ3pCLENBQUMsQ0FBQztRQUNILE1BQU0sUUFBUSxHQUFHLGlCQUFpQixDQUFDLFFBQVEsQ0FBQztRQUU1QyxNQUFNLFlBQVksR0FBRyxJQUFJLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUNyRSxTQUFTLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyx5QkFBeUIsQ0FBQztZQUM1RSxXQUFXLEVBQUU7Z0JBQ1QsVUFBVSxFQUFFLFNBQVMsQ0FBQyxlQUFlLENBQUMsMEJBQTBCO2dCQUNoRSxvQkFBb0IsRUFBRTtvQkFDbEIsb0JBQW9CLEVBQUU7d0JBQ2xCLEtBQUssRUFBRSxXQUFXO3FCQUNyQjtpQkFDSjtnQkFDRCxVQUFVLEVBQUUsSUFBSTthQUNuQjtTQUNKLENBQUMsQ0FBQztRQUVILHVEQUF1RDtRQUN2RCxpQkFBaUI7UUFDakIsOENBQThDO1FBQzlDLDRDQUE0QztRQUM1QyxnREFBZ0Q7UUFDaEQsd0RBQXdEO1FBQ3hELFNBQVM7UUFDVCx1QkFBdUI7UUFDdkIsT0FBTztRQUNQLHVEQUF1RDtRQUN2RCx5REFBeUQ7UUFDekQsaURBQWlEO1FBQ2pELHFDQUFxQztRQUNyQyw2QkFBNkI7UUFDN0Isb0NBQW9DO1FBQ3BDLFVBQVU7UUFDVixPQUFPO1FBRVAsTUFBTSxZQUFZLEdBQUcsSUFBSSxPQUFPLENBQUMsZUFBZSxDQUFDO1lBQzdDLFVBQVUsRUFBRSxRQUFRO1lBQ3BCLE9BQU8sRUFBRSxZQUFZO1lBQ3JCLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxZQUFZO1NBQ3hDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDZCxTQUFTLEVBQUUsZ0JBQWdCO1lBQzNCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztTQUMxQixDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUF0REQsNENBc0RDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuaW1wb3J0IGNkayA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2NvcmUnKTtcbmltcG9ydCBjb2RlYnVpbGQgPSByZXF1aXJlKCdAYXdzLWNkay9hd3MtY29kZWJ1aWxkJyk7XG5pbXBvcnQgYWN0aW9ucyA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1jb2RlcGlwZWxpbmUtYWN0aW9ucycpO1xuaW1wb3J0IGlhbSA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1pYW0nKTtcbmltcG9ydCB7IENES0NmblBpcGVsaW5lIH0gZnJvbSAnLi9waXBlbGluZSc7XG5cbmV4cG9ydCBjbGFzcyBJYUNQaXBlbGluZVN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQ6IGNkay5BcHAsIG5hbWU6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgICAgICBzdXBlcihwYXJlbnQsIG5hbWUsIHByb3BzKTtcblxuICAgICAgICBjb25zdCBwaXBlbGluZUNvbnN0cnVjdCA9IG5ldyBDREtDZm5QaXBlbGluZSh0aGlzLCAnUGlwZWxpbmUnLCB7XG4gICAgICAgICAgICBwaXBlbGluZU5hbWU6ICdpbmZyYS1hcy1hLWNvZGUnLFxuICAgICAgICAgICAgc3RhY2tOYW1lOiAnSWFDJyxcbiAgICAgICAgICAgIHRlbXBsYXRlTmFtZTogJ0luZnJhU3RhY2snLFxuICAgICAgICAgICAgZGlyZWN0b3J5OiAnY2RrLWluZnJhJ1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcGlwZWxpbmUgPSBwaXBlbGluZUNvbnN0cnVjdC5waXBlbGluZTtcblxuICAgICAgICBjb25zdCBidWlsZFByb2plY3QgPSBuZXcgY29kZWJ1aWxkLlBpcGVsaW5lUHJvamVjdCh0aGlzLCAnQnVpbGRQcm9qZWN0Jywge1xuICAgICAgICAgICAgYnVpbGRTcGVjOiBjb2RlYnVpbGQuQnVpbGRTcGVjLmZyb21Tb3VyY2VGaWxlbmFtZSgnY2RrLWluZnJhL2J1aWxkc3BlYy55bWwnKSxcbiAgICAgICAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgICAgICAgICAgYnVpbGRJbWFnZTogY29kZWJ1aWxkLkxpbnV4QnVpbGRJbWFnZS5VQlVOVFVfMTRfMDRfTk9ERUpTXzEwXzFfMCxcbiAgICAgICAgICAgICAgICBlbnZpcm9ubWVudFZhcmlhYmxlczoge1xuICAgICAgICAgICAgICAgICAgICAnQVdTX0RFRkFVTFRfUkVHSU9OJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICd1cy1lYXN0LTInXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHByaXZpbGVnZWQ6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gbGV4UHJvamVjdC5hZGRUb1JvbGVQb2xpY3kobmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICAvLyAgICAgYWN0aW9uczogW1xuICAgICAgICAvLyAgICAgICAgICdsZXg6U3RhcnRJbXBvcnQnLCAnbGV4OkdldEltcG9ydCcsXG4gICAgICAgIC8vICAgICAgICAgJ2xleDpHZXRJbnRlbnQnLCAnbGV4OlB1dEludGVudCcsXG4gICAgICAgIC8vICAgICAgICAgJ2xleDpHZXRTbG90VHlwZScsICdsZXg6UHV0U2xvdFR5cGUnLFxuICAgICAgICAvLyAgICAgICAgICdsZXg6R2V0Qm90JywgJ2xleDpQdXRCb3QnLCAnbGV4OlB1dEJvdEFsaWFzJ1xuICAgICAgICAvLyAgICAgXSxcbiAgICAgICAgLy8gICAgIHJlc291cmNlczogW1wiKlwiXVxuICAgICAgICAvLyB9KSk7XG4gICAgICAgIC8vIGxleFByb2plY3QuYWRkVG9Sb2xlUG9saWN5KG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgLy8gICAgIGFjdGlvbnM6IFsnY2xvdWRmb3JtYXRpb246RGVzY3JpYmVTdGFja1Jlc291cmNlJ10sXG4gICAgICAgIC8vICAgICByZXNvdXJjZXM6IFtjZGsuU3RhY2sub2YodGhpcykuZm9ybWF0QXJuKHtcbiAgICAgICAgLy8gICAgICAgICBzZXJ2aWNlOiAnY2xvdWRmb3JtYXRpb24nLFxuICAgICAgICAvLyAgICAgICAgIHJlc291cmNlOiAnc3RhY2snLFxuICAgICAgICAvLyAgICAgICAgIHJlc291cmNlTmFtZTogJ0hlbGxvSzhzKidcbiAgICAgICAgLy8gICAgIH0pXVxuICAgICAgICAvLyB9KSk7XG5cbiAgICAgICAgY29uc3QgZGVwbG95QWN0aW9uID0gbmV3IGFjdGlvbnMuQ29kZUJ1aWxkQWN0aW9uKHtcbiAgICAgICAgICAgIGFjdGlvbk5hbWU6ICdEZXBsb3knLFxuICAgICAgICAgICAgcHJvamVjdDogYnVpbGRQcm9qZWN0LFxuICAgICAgICAgICAgaW5wdXQ6IHBpcGVsaW5lQ29uc3RydWN0LnNvdXJjZU91dHB1dFxuICAgICAgICB9KTtcblxuICAgICAgICBwaXBlbGluZS5hZGRTdGFnZSh7XG4gICAgICAgICAgICBzdGFnZU5hbWU6ICdEZXBsb3lIZWxsb0s4cycsXG4gICAgICAgICAgICBhY3Rpb25zOiBbZGVwbG95QWN0aW9uXVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=