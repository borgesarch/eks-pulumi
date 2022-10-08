import * as awsx from "@pulumi/awsx";
import * as eks from "@pulumi/eks";

export = async () => {
    const cluster = new eks.Cluster("eks-dev", {
        instanceType: "t2.medium",
        desiredCapacity: 2,
        minSize: 1,
        maxSize: 2,
    });
}

