#!/usr/bin/env node

// import * as cdk from '@aws-cdk/core';
import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');
import ecr = require('@aws-cdk/aws-ecr');
import eks = require('@aws-cdk/aws-eks');

export class InfraStack extends cdk.Stack {

    constructor(parent: cdk.App, name: string, props?: cdk.StackProps) {
        super(parent, name, props);

        const vpc = new ec2.Vpc(this, 'Vpc', {
          cidr: '10.0.0.0/16',
          natGateways: 1
        })

        const cluster = new eks.Cluster(this, 'Cluster', {
          vpc,
          defaultCapacity: 2,
          //mastersRole: clusterAdmin,
          outputClusterName: true,
        });

        const ecrRepo = new ecr.Repository(this, 'EcrRepo');

    }
}
