#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as cdk from '@aws-cdk/core';
const cdk = require("@aws-cdk/core");
const ec2 = require("@aws-cdk/aws-ec2");
const ecr = require("@aws-cdk/aws-ecr");
const eks = require("@aws-cdk/aws-eks");
class InfraStack extends cdk.Stack {
    constructor(parent, name, props) {
        super(parent, name, props);
        const vpc = new ec2.Vpc(this, 'Vpc', {
            cidr: '10.0.0.0/16',
            natGateways: 1
        });
        const cluster = new eks.Cluster(this, 'Cluster', {
            vpc,
            defaultCapacity: 2,
            //mastersRole: clusterAdmin,
            outputClusterName: true,
        });
        const ecrRepo = new ecr.Repository(this, 'EcrRepo');
    }
}
exports.InfraStack = InfraStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mcmEtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmZyYS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSx3Q0FBd0M7QUFDeEMscUNBQXNDO0FBQ3RDLHdDQUF5QztBQUN6Qyx3Q0FBeUM7QUFDekMsd0NBQXlDO0FBRXpDLE1BQWEsVUFBVyxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBRXJDLFlBQVksTUFBZSxFQUFFLElBQVksRUFBRSxLQUFzQjtRQUM3RCxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUUzQixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtZQUNuQyxJQUFJLEVBQUUsYUFBYTtZQUNuQixXQUFXLEVBQUUsQ0FBQztTQUNmLENBQUMsQ0FBQTtRQUVGLE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQy9DLEdBQUc7WUFDSCxlQUFlLEVBQUUsQ0FBQztZQUNsQiw0QkFBNEI7WUFDNUIsaUJBQWlCLEVBQUUsSUFBSTtTQUN4QixDQUFDLENBQUM7UUFFSCxNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBRXhELENBQUM7Q0FDSjtBQXBCRCxnQ0FvQkMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cbi8vIGltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCBjZGsgPSByZXF1aXJlKCdAYXdzLWNkay9jb3JlJyk7XG5pbXBvcnQgZWMyID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWVjMicpO1xuaW1wb3J0IGVjciA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1lY3InKTtcbmltcG9ydCBla3MgPSByZXF1aXJlKCdAYXdzLWNkay9hd3MtZWtzJyk7XG5cbmV4cG9ydCBjbGFzcyBJbmZyYVN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcblxuICAgIGNvbnN0cnVjdG9yKHBhcmVudDogY2RrLkFwcCwgbmFtZTogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgICAgIHN1cGVyKHBhcmVudCwgbmFtZSwgcHJvcHMpO1xuXG4gICAgICAgIGNvbnN0IHZwYyA9IG5ldyBlYzIuVnBjKHRoaXMsICdWcGMnLCB7XG4gICAgICAgICAgY2lkcjogJzEwLjAuMC4wLzE2JyxcbiAgICAgICAgICBuYXRHYXRld2F5czogMVxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IGNsdXN0ZXIgPSBuZXcgZWtzLkNsdXN0ZXIodGhpcywgJ0NsdXN0ZXInLCB7XG4gICAgICAgICAgdnBjLFxuICAgICAgICAgIGRlZmF1bHRDYXBhY2l0eTogMixcbiAgICAgICAgICAvL21hc3RlcnNSb2xlOiBjbHVzdGVyQWRtaW4sXG4gICAgICAgICAgb3V0cHV0Q2x1c3Rlck5hbWU6IHRydWUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGVjclJlcG8gPSBuZXcgZWNyLlJlcG9zaXRvcnkodGhpcywgJ0VjclJlcG8nKTtcblxuICAgIH1cbn1cbiJdfQ==