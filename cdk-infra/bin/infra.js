#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import 'source-map-support/register';
const cdk = require("@aws-cdk/core");
const infra_stack_1 = require("../lib/infra-stack");
//import { IaCPipelineStack } from '../lib/infra-pipeline';
const app = new cdk.App();
//new InfraStack(app, 'InfraStack');
new infra_stack_1.InfraStack(app, 'InfraStack', {
    env: { account: process.env['CDK_DEFAULT_ACCOUNT'], region: 'us-east-2' },
    tags: {
        project: "cdk8s-test"
    }
});
app.synth();
// const app = new cdk.App();
// new IaCPipelineStack(app, 'IaCPipeline');
// app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mcmEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmZyYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1Q0FBdUM7QUFDdkMscUNBQXNDO0FBQ3RDLG9EQUFnRDtBQUNoRCwyREFBMkQ7QUFFM0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUIsb0NBQW9DO0FBQ3BDLElBQUksd0JBQVUsQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFO0lBQzlCLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRTtJQUN6RSxJQUFJLEVBQUU7UUFDRixPQUFPLEVBQUUsWUFBWTtLQUN4QjtDQUNKLENBQUMsQ0FBQztBQUNILEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUtaLDZCQUE2QjtBQUM3Qiw0Q0FBNEM7QUFDNUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcbi8vaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuaW1wb3J0IGNkayA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2NvcmUnKTtcbmltcG9ydCB7IEluZnJhU3RhY2sgfSBmcm9tICcuLi9saWIvaW5mcmEtc3RhY2snO1xuLy9pbXBvcnQgeyBJYUNQaXBlbGluZVN0YWNrIH0gZnJvbSAnLi4vbGliL2luZnJhLXBpcGVsaW5lJztcblxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbi8vbmV3IEluZnJhU3RhY2soYXBwLCAnSW5mcmFTdGFjaycpO1xubmV3IEluZnJhU3RhY2soYXBwLCAnSW5mcmFTdGFjaycsIHtcbiAgICBlbnY6IHsgYWNjb3VudDogcHJvY2Vzcy5lbnZbJ0NES19ERUZBVUxUX0FDQ09VTlQnXSwgcmVnaW9uOiAndXMtZWFzdC0yJyB9LFxuICAgIHRhZ3M6IHtcbiAgICAgICAgcHJvamVjdDogXCJjZGs4cy10ZXN0XCJcbiAgICB9XG59KTtcbmFwcC5zeW50aCgpO1xuXG5cblxuXG4vLyBjb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuLy8gbmV3IElhQ1BpcGVsaW5lU3RhY2soYXBwLCAnSWFDUGlwZWxpbmUnKTtcbi8vIGFwcC5zeW50aCgpO1xuXG4iXX0=