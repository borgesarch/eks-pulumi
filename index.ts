import * as awsx from "@pulumi/awsx";
import * as eks from "@pulumi/eks";

export = async () => {

    const vpc = new awsx.ec2.Vpc("eks-sa-vpc", {
        numberOfAvailabilityZones: 2, tags: { 
            name : 'eks-sa-vpc'
        },
    })
    const cluster = new eks.Cluster("eks-sa-dev", {
        vpcId: vpc.id,
        instanceType: "t2.medium",
        desiredCapacity: 2,
        minSize: 1,
        maxSize: 2,
    });
}

