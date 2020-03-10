#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("@aws-cdk/core");
const infra_stack_1 = require("../lib/infra-stack");
const infra_pipeline_1 = require("../lib/infra-pipeline");
const app = new cdk.App();
//new InfraStack(app, 'InfraStack');
new infra_stack_1.InfraStack(app, 'InfraStack', {
    env: { account: process.env['CDK_DEFAULT_ACCOUNT'], region: 'us-east-2' },
    tags: {
        project: "cdk8s-test"
    }
});
// app.synth();
// const app = new cdk.App();
new infra_pipeline_1.IaCPipelineStack(app, 'IaCPipeline');
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mcmEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmZyYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1Q0FBcUM7QUFDckMscUNBQXNDO0FBQ3RDLG9EQUFnRDtBQUNoRCwwREFBeUQ7QUFFekQsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUIsb0NBQW9DO0FBQ3BDLElBQUksd0JBQVUsQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFO0lBQzlCLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRTtJQUN6RSxJQUFJLEVBQUU7UUFDRixPQUFPLEVBQUUsWUFBWTtLQUN4QjtDQUNKLENBQUMsQ0FBQztBQUNILGVBQWU7QUFLZiw2QkFBNkI7QUFDN0IsSUFBSSxpQ0FBZ0IsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDekMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuaW1wb3J0IGNkayA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2NvcmUnKTtcbmltcG9ydCB7IEluZnJhU3RhY2sgfSBmcm9tICcuLi9saWIvaW5mcmEtc3RhY2snO1xuaW1wb3J0IHsgSWFDUGlwZWxpbmVTdGFjayB9IGZyb20gJy4uL2xpYi9pbmZyYS1waXBlbGluZSc7XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG4vL25ldyBJbmZyYVN0YWNrKGFwcCwgJ0luZnJhU3RhY2snKTtcbm5ldyBJbmZyYVN0YWNrKGFwcCwgJ0luZnJhU3RhY2snLCB7XG4gICAgZW52OiB7IGFjY291bnQ6IHByb2Nlc3MuZW52WydDREtfREVGQVVMVF9BQ0NPVU5UJ10sIHJlZ2lvbjogJ3VzLWVhc3QtMicgfSxcbiAgICB0YWdzOiB7XG4gICAgICAgIHByb2plY3Q6IFwiY2RrOHMtdGVzdFwiXG4gICAgfVxufSk7XG4vLyBhcHAuc3ludGgoKTtcblxuXG5cblxuLy8gY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbm5ldyBJYUNQaXBlbGluZVN0YWNrKGFwcCwgJ0lhQ1BpcGVsaW5lJyk7XG5hcHAuc3ludGgoKTtcblxuIl19