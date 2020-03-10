import { Construct } from '@aws-cdk/core';
export interface WebServiceOptions {
    /**
     * The Docker image to use for this service.
     */
    readonly image: string;
    /**
     * Number of replicas.
     *
     * @default 1
     */
    readonly replicas?: number;
    /**
     * External port.
     *
     * @default 80
     */
    readonly port?: number;
    /**
     * Internal port.
     *
     * @default 8080
     */
    readonly containerPort?: number;
}
export declare class WebService extends Construct {
    constructor(scope: Construct, ns: string, options: WebServiceOptions);
}
