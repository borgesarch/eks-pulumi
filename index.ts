import * as awsx from "@pulumi/awsx";
import * as eks from "@pulumi/eks";

export = async () => {
    const vpc = new awsx.ec2.Vpc("eks-vpc", {
        cidrBlock: "10.0.0.0/16", 
        numberOfAvailabilityZones: 2, tags: { 
            name : 'eks-vpc'
        },
    })
    const publicSub = new awsx.ec2.Subnet("eks-sub-pub", vpc, {
        cidrBlock: '10.0.1.0/24',
    });

    const privateSub = new awsx.ec2.Subnet("eks-sub-pri", vpc, {
        cidrBlock: '10.0.4.0/24',
    });

    const cluster = new eks.Cluster("eks-cluster", {
        vpcId: vpc.id,
        instanceType: "t2.medium",
        desiredCapacity: 2,
        minSize: 1,
        subnetIds: [publicSub.id],
        privateSubnetIds: [privateSub.id],
        maxSize: 2,
    });
}

