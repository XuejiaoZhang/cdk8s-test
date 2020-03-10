"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@aws-cdk/core");
const service_v1_1 = require("../.gen/service-v1");
const apps_deployment_v1_1 = require("../.gen/apps-deployment-v1");
class WebService extends core_1.Construct {
    constructor(scope, ns, options) {
        super(scope, ns);
        const port = options.port || 80;
        const containerPort = options.containerPort || 8080;
        const label = { app: this.node.uniqueId };
        new service_v1_1.Service(this, 'service', {
            spec: {
                type: 'LoadBalancer',
                ports: [{ port, targetPort: service_v1_1.IntOrString.fromNumber(containerPort) }],
                selector: label
            }
        });
        new apps_deployment_v1_1.Deployment(this, 'deployment', {
            spec: {
                replicas: 1,
                selector: {
                    matchLabels: label
                },
                template: {
                    metadata: { labels: label },
                    spec: {
                        containers: [
                            {
                                name: this.node.id,
                                image: options.image,
                                ports: [{ containerPort }]
                            }
                        ]
                    }
                }
            }
        });
    }
}
exports.WebService = WebService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3ZWItc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUEwQztBQUMxQyxtREFBMEQ7QUFDMUQsbUVBQXdEO0FBOEJ4RCxNQUFhLFVBQVcsU0FBUSxnQkFBUztJQUN2QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLE9BQTBCO1FBQ2xFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDaEMsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUM7UUFDcEQsTUFBTSxLQUFLLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUUxQyxJQUFJLG9CQUFPLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUMzQixJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLGNBQWM7Z0JBQ3BCLEtBQUssRUFBRSxDQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSx3QkFBVyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFFO2dCQUN0RSxRQUFRLEVBQUUsS0FBSzthQUNoQjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksK0JBQVUsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ2pDLElBQUksRUFBRTtnQkFDSixRQUFRLEVBQUUsQ0FBQztnQkFDWCxRQUFRLEVBQUU7b0JBQ1IsV0FBVyxFQUFFLEtBQUs7aUJBQ25CO2dCQUNELFFBQVEsRUFBRTtvQkFDUixRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO29CQUMzQixJQUFJLEVBQUU7d0JBQ0osVUFBVSxFQUFFOzRCQUNWO2dDQUNFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0NBQ2xCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztnQ0FDcEIsS0FBSyxFQUFFLENBQUUsRUFBRSxhQUFhLEVBQUUsQ0FBRTs2QkFDN0I7eUJBQ0Y7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQXJDRCxnQ0FxQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCB7IFNlcnZpY2UsIEludE9yU3RyaW5nIH0gZnJvbSAnLi4vLmdlbi9zZXJ2aWNlLXYxJztcbmltcG9ydCB7IERlcGxveW1lbnQgfSBmcm9tICcuLi8uZ2VuL2FwcHMtZGVwbG95bWVudC12MSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2ViU2VydmljZU9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIERvY2tlciBpbWFnZSB0byB1c2UgZm9yIHRoaXMgc2VydmljZS5cbiAgICovXG4gIHJlYWRvbmx5IGltYWdlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiByZXBsaWNhcy5cbiAgICpcbiAgICogQGRlZmF1bHQgMVxuICAgKi9cbiAgcmVhZG9ubHkgcmVwbGljYXM/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEV4dGVybmFsIHBvcnQuXG4gICAqXG4gICAqIEBkZWZhdWx0IDgwXG4gICAqL1xuICByZWFkb25seSBwb3J0PzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJbnRlcm5hbCBwb3J0LlxuICAgKlxuICAgKiBAZGVmYXVsdCA4MDgwXG4gICAqL1xuICByZWFkb25seSBjb250YWluZXJQb3J0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgV2ViU2VydmljZSBleHRlbmRzIENvbnN0cnVjdCB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIG5zOiBzdHJpbmcsIG9wdGlvbnM6IFdlYlNlcnZpY2VPcHRpb25zKSB7XG4gICAgc3VwZXIoc2NvcGUsIG5zKTtcblxuICAgIGNvbnN0IHBvcnQgPSBvcHRpb25zLnBvcnQgfHwgODA7XG4gICAgY29uc3QgY29udGFpbmVyUG9ydCA9IG9wdGlvbnMuY29udGFpbmVyUG9ydCB8fCA4MDgwO1xuICAgIGNvbnN0IGxhYmVsID0geyBhcHA6IHRoaXMubm9kZS51bmlxdWVJZCB9O1xuXG4gICAgbmV3IFNlcnZpY2UodGhpcywgJ3NlcnZpY2UnLCB7XG4gICAgICBzcGVjOiB7XG4gICAgICAgIHR5cGU6ICdMb2FkQmFsYW5jZXInLFxuICAgICAgICBwb3J0czogWyB7IHBvcnQsIHRhcmdldFBvcnQ6IEludE9yU3RyaW5nLmZyb21OdW1iZXIoY29udGFpbmVyUG9ydCkgfSBdLFxuICAgICAgICBzZWxlY3RvcjogbGFiZWxcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIG5ldyBEZXBsb3ltZW50KHRoaXMsICdkZXBsb3ltZW50Jywge1xuICAgICAgc3BlYzoge1xuICAgICAgICByZXBsaWNhczogMSxcbiAgICAgICAgc2VsZWN0b3I6IHtcbiAgICAgICAgICBtYXRjaExhYmVsczogbGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICBtZXRhZGF0YTogeyBsYWJlbHM6IGxhYmVsIH0sXG4gICAgICAgICAgc3BlYzoge1xuICAgICAgICAgICAgY29udGFpbmVyczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy5ub2RlLmlkLFxuICAgICAgICAgICAgICAgIGltYWdlOiBvcHRpb25zLmltYWdlLFxuICAgICAgICAgICAgICAgIHBvcnRzOiBbIHsgY29udGFpbmVyUG9ydCB9IF1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59Il19