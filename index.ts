import * as awsx from "@pulumi/awsx";
import * as eks from "@pulumi/eks";

export = async () => {
    const vpc = new awsx.ec2.Vpc("eks-vpc", {
        cidrBlock: "10.0.0.0/16", 
        numberOfAvailabilityZones: 2, tags: { 
            name : 'eks-vpc'
        },
    })
    const cluster = new eks.Cluster("eks-cluster", {
        vpcId: vpc.id,
        instanceType: "t2.medium",
        desiredCapacity: 2,
        minSize: 1,
        maxSize: 2,
    });
}

