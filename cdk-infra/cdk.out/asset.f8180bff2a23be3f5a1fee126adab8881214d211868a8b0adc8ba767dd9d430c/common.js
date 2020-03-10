"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResourceHandler {
    constructor(eks, event) {
        this.eks = eks;
        this.requestType = event.RequestType;
        this.requestId = event.RequestId;
        this.logicalResourceId = event.LogicalResourceId;
        this.physicalResourceId = event.PhysicalResourceId;
        this.event = event;
        const roleToAssume = event.ResourceProperties.AssumeRoleArn;
        if (!roleToAssume) {
            throw new Error(`AssumeRoleArn must be provided`);
        }
        eks.configureAssumeRole({
            RoleArn: roleToAssume,
            RoleSessionName: `AWSCDK.EKSCluster.${this.requestType}.${this.requestId}`
        });
    }
    onEvent() {
        switch (this.requestType) {
            case 'Create': return this.onCreate();
            case 'Update': return this.onUpdate();
            case 'Delete': return this.onDelete();
        }
        throw new Error(`Invalid request type ${this.requestType}`);
    }
    isComplete() {
        switch (this.requestType) {
            case 'Create': return this.isCreateComplete();
            case 'Update': return this.isUpdateComplete();
            case 'Delete': return this.isDeleteComplete();
        }
        throw new Error(`Invalid request type ${this.requestType}`);
    }
    log(x) {
        // tslint:disable-next-line: no-console
        console.log(JSON.stringify(x, undefined, 2));
    }
}
exports.ResourceHandler = ResourceHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0EsTUFBc0IsZUFBZTtJQU9uQyxZQUErQixHQUFjLEVBQUUsS0FBa0Q7UUFBbEUsUUFBRyxHQUFILEdBQUcsQ0FBVztRQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUMsaUJBQWlCLENBQUM7UUFDakQsSUFBSSxDQUFDLGtCQUFrQixHQUFJLEtBQWEsQ0FBQyxrQkFBa0IsQ0FBQztRQUM1RCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUVuQixNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDO1FBQzVELElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsR0FBRyxDQUFDLG1CQUFtQixDQUFDO1lBQ3RCLE9BQU8sRUFBRSxZQUFZO1lBQ3JCLGVBQWUsRUFBRSxxQkFBcUIsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1NBQzNFLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxPQUFPO1FBQ1osUUFBUSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3hCLEtBQUssUUFBUSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEMsS0FBSyxRQUFRLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0QyxLQUFLLFFBQVEsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3ZDO1FBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVNLFVBQVU7UUFDZixRQUFRLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDeEIsS0FBSyxRQUFRLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzlDLEtBQUssUUFBUSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUM5QyxLQUFLLFFBQVEsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDL0M7UUFFRCxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRVMsR0FBRyxDQUFDLENBQU07UUFDbEIsdUNBQXVDO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztDQVFGO0FBeERELDBDQXdEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElzQ29tcGxldGVSZXNwb25zZSwgT25FdmVudFJlc3BvbnNlIH0gZnJvbSBcIkBhd3MtY2RrL2N1c3RvbS1yZXNvdXJjZXMvbGliL3Byb3ZpZGVyLWZyYW1ld29yay90eXBlc1wiO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzXG5pbXBvcnQgKiBhcyBhd3MgZnJvbSAnYXdzLXNkayc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZXNvdXJjZUhhbmRsZXIge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgcmVxdWVzdElkOiBzdHJpbmc7XG4gIHByb3RlY3RlZCByZWFkb25seSBsb2dpY2FsUmVzb3VyY2VJZDogc3RyaW5nO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgcmVxdWVzdFR5cGU6ICdDcmVhdGUnIHwgJ1VwZGF0ZScgfCAnRGVsZXRlJztcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHBoeXNpY2FsUmVzb3VyY2VJZD86IHN0cmluZztcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGV2ZW50OiBBV1NMYW1iZGEuQ2xvdWRGb3JtYXRpb25DdXN0b21SZXNvdXJjZUV2ZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZWFkb25seSBla3M6IEVrc0NsaWVudCwgZXZlbnQ6IEFXU0xhbWJkYS5DbG91ZEZvcm1hdGlvbkN1c3RvbVJlc291cmNlRXZlbnQpIHtcbiAgICB0aGlzLnJlcXVlc3RUeXBlID0gZXZlbnQuUmVxdWVzdFR5cGU7XG4gICAgdGhpcy5yZXF1ZXN0SWQgPSBldmVudC5SZXF1ZXN0SWQ7XG4gICAgdGhpcy5sb2dpY2FsUmVzb3VyY2VJZCA9IGV2ZW50LkxvZ2ljYWxSZXNvdXJjZUlkO1xuICAgIHRoaXMucGh5c2ljYWxSZXNvdXJjZUlkID0gKGV2ZW50IGFzIGFueSkuUGh5c2ljYWxSZXNvdXJjZUlkO1xuICAgIHRoaXMuZXZlbnQgPSBldmVudDtcblxuICAgIGNvbnN0IHJvbGVUb0Fzc3VtZSA9IGV2ZW50LlJlc291cmNlUHJvcGVydGllcy5Bc3N1bWVSb2xlQXJuO1xuICAgIGlmICghcm9sZVRvQXNzdW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEFzc3VtZVJvbGVBcm4gbXVzdCBiZSBwcm92aWRlZGApO1xuICAgIH1cblxuICAgIGVrcy5jb25maWd1cmVBc3N1bWVSb2xlKHtcbiAgICAgIFJvbGVBcm46IHJvbGVUb0Fzc3VtZSxcbiAgICAgIFJvbGVTZXNzaW9uTmFtZTogYEFXU0NESy5FS1NDbHVzdGVyLiR7dGhpcy5yZXF1ZXN0VHlwZX0uJHt0aGlzLnJlcXVlc3RJZH1gXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgb25FdmVudCgpIHtcbiAgICBzd2l0Y2ggKHRoaXMucmVxdWVzdFR5cGUpIHtcbiAgICAgIGNhc2UgJ0NyZWF0ZSc6IHJldHVybiB0aGlzLm9uQ3JlYXRlKCk7XG4gICAgICBjYXNlICdVcGRhdGUnOiByZXR1cm4gdGhpcy5vblVwZGF0ZSgpO1xuICAgICAgY2FzZSAnRGVsZXRlJzogcmV0dXJuIHRoaXMub25EZWxldGUoKTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcmVxdWVzdCB0eXBlICR7dGhpcy5yZXF1ZXN0VHlwZX1gKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0NvbXBsZXRlKCkge1xuICAgIHN3aXRjaCAodGhpcy5yZXF1ZXN0VHlwZSkge1xuICAgICAgY2FzZSAnQ3JlYXRlJzogcmV0dXJuIHRoaXMuaXNDcmVhdGVDb21wbGV0ZSgpO1xuICAgICAgY2FzZSAnVXBkYXRlJzogcmV0dXJuIHRoaXMuaXNVcGRhdGVDb21wbGV0ZSgpO1xuICAgICAgY2FzZSAnRGVsZXRlJzogcmV0dXJuIHRoaXMuaXNEZWxldGVDb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCByZXF1ZXN0IHR5cGUgJHt0aGlzLnJlcXVlc3RUeXBlfWApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGxvZyh4OiBhbnkpIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh4LCB1bmRlZmluZWQsIDIpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBhc3luYyBvbkNyZWF0ZSgpOiBQcm9taXNlPE9uRXZlbnRSZXNwb25zZT47XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBhc3luYyBvbkRlbGV0ZSgpOiBQcm9taXNlPE9uRXZlbnRSZXNwb25zZSB8IHZvaWQ+O1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgYXN5bmMgb25VcGRhdGUoKTogUHJvbWlzZTxPbkV2ZW50UmVzcG9uc2UgfCB2b2lkPjtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IGFzeW5jIGlzQ3JlYXRlQ29tcGxldGUoKTogUHJvbWlzZTxJc0NvbXBsZXRlUmVzcG9uc2U+O1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgYXN5bmMgaXNEZWxldGVDb21wbGV0ZSgpOiBQcm9taXNlPElzQ29tcGxldGVSZXNwb25zZT47XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBhc3luYyBpc1VwZGF0ZUNvbXBsZXRlKCk6IFByb21pc2U8SXNDb21wbGV0ZVJlc3BvbnNlPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFa3NDbGllbnQge1xuICBjb25maWd1cmVBc3N1bWVSb2xlKHJlcXVlc3Q6IGF3cy5TVFMuQXNzdW1lUm9sZVJlcXVlc3QpOiB2b2lkO1xuICBjcmVhdGVDbHVzdGVyKHJlcXVlc3Q6IGF3cy5FS1MuQ3JlYXRlQ2x1c3RlclJlcXVlc3QpOiBQcm9taXNlPGF3cy5FS1MuQ3JlYXRlQ2x1c3RlclJlc3BvbnNlPjtcbiAgZGVsZXRlQ2x1c3RlcihyZXF1ZXN0OiBhd3MuRUtTLkRlbGV0ZUNsdXN0ZXJSZXF1ZXN0KTogUHJvbWlzZTxhd3MuRUtTLkRlbGV0ZUNsdXN0ZXJSZXNwb25zZT47XG4gIGRlc2NyaWJlQ2x1c3RlcihyZXF1ZXN0OiBhd3MuRUtTLkRlc2NyaWJlQ2x1c3RlclJlcXVlc3QpOiBQcm9taXNlPGF3cy5FS1MuRGVzY3JpYmVDbHVzdGVyUmVzcG9uc2U+O1xuICB1cGRhdGVDbHVzdGVyQ29uZmlnKHJlcXVlc3Q6IGF3cy5FS1MuVXBkYXRlQ2x1c3RlckNvbmZpZ1JlcXVlc3QpOiBQcm9taXNlPGF3cy5FS1MuVXBkYXRlQ2x1c3RlckNvbmZpZ1Jlc3BvbnNlPjtcbiAgdXBkYXRlQ2x1c3RlclZlcnNpb24ocmVxdWVzdDogYXdzLkVLUy5VcGRhdGVDbHVzdGVyVmVyc2lvblJlcXVlc3QpOiBQcm9taXNlPGF3cy5FS1MuVXBkYXRlQ2x1c3RlclZlcnNpb25SZXNwb25zZT47XG4gIGNyZWF0ZUZhcmdhdGVQcm9maWxlKHJlcXVlc3Q6IGF3cy5FS1MuQ3JlYXRlRmFyZ2F0ZVByb2ZpbGVSZXF1ZXN0KTogUHJvbWlzZTxhd3MuRUtTLkNyZWF0ZUZhcmdhdGVQcm9maWxlUmVzcG9uc2U+O1xuICBkZXNjcmliZUZhcmdhdGVQcm9maWxlKHJlcXVlc3Q6IGF3cy5FS1MuRGVzY3JpYmVGYXJnYXRlUHJvZmlsZVJlcXVlc3QpOiBQcm9taXNlPGF3cy5FS1MuRGVzY3JpYmVGYXJnYXRlUHJvZmlsZVJlc3BvbnNlPjtcbiAgZGVsZXRlRmFyZ2F0ZVByb2ZpbGUocmVxdWVzdDogYXdzLkVLUy5EZWxldGVGYXJnYXRlUHJvZmlsZVJlcXVlc3QpOiBQcm9taXNlPGF3cy5FS1MuRGVsZXRlRmFyZ2F0ZVByb2ZpbGVSZXNwb25zZT47XG59XG4iXX0=