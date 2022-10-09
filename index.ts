import * as awsx from "@pulumi/awsx";
import * as eks from "@pulumi/eks";
import * as pulumi from "@pulumi/pulumi";

const projectName = pulumi.getProject();

const cluster1 = new eks.Cluster(`${projectName}-1`);

const vpc = new awsx.ec2.Vpc(`${projectName}-2`, {
    tags: {"Name": `${projectName}-2`},
});

const cluster2 = new eks.Cluster(`${projectName}-2`, {
    vpcId: vpc.id,
    publicSubnetIds: vpc.publicSubnetIds,
    desiredCapacity: 2,
    minSize: 2,
    maxSize: 2,
    deployDashboard: false,
    enabledClusterLogTypes: [
        "api",
        "audit",
        "authenticator",
    ],
    vpcCniOptions: {
        disableTcpEarlyDemux: true,
    },
});

export const kubeconfig1 = cluster1.kubeconfig;
export const kubeconfig2 = cluster2.kubeconfig;
export const iamRoleArn = cluster1.core.clusterIamRole.arn;

