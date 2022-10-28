---
title: "PaaS Offload - Kubernetes"
layout: documentation
visibility: public
---

# Intro Video #
<iframe width="560" height="315" src="https://www.youtube.com/embed/7Nk0ljPSE-8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# Demo Video #
<iframe width="560" height="315" src="https://www.youtube.com/embed/LUz9SfOsWZ0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# Infrastructure Application Interface #

 - **Deployment Yaml** : Existing interface to deploy container pods and configure their networking.
 - **K8s Infrastructure gRPC** : gRPC used between the K8s networking infrastructure and the CNI providing the network interface to the container pods.
 - **Container Dedicated Queues (CDQs)** :  An optional enhancement that enables dedicated hardware queues from the infrastructure to be allocated to individual container pods, providing a direct connection between the pod and the infrastructure without any intervening software layers that would normally impact performance.

In this recipe the 'Infrastructure' functionality of Kubernetes networking is split out into a 'Manager' function separate from the CNI that interfaces with the business logic running in the pod.  The CNI communicates to the Infrastructure component through this *K8s Infrastructure gRPC*.  This is going to separate the k8s infrastructure from the business logic, enabling it to run somewhere else, for example on an IPU.

# Target Abstraction Interface #

 - **Calico P4 Plug-in** : Calico is used to interconnect the pods together, apply ACLs and enable dynamic load balancing across services.  Using Calico's plug-in interface the dataplane commands to enable these functions are convereted into P4 and applied into Open vSwitch using P4Runtime.  This is similar is spirit to the Calico plug-in for VPP.
 - **k8s.p4** :  Portable NIC Architecture (PNA) program for routing, ACLs, connection tracking and load balancing that defines the dataplane functionality required from Calico.  This replaces the kernel dataplane (iptables, iproute, etc.) and needs to be combined with the kernel dataplane functionality around tunneling, bridging, mirroring, etc.

By defining the dataplane in P4 we can use the compiler to determine if a target can support the requirements needed by Calico to interconnect the pods.  Existing kernel functionality must also be supported to preserve existing semantics around monitoring, telemetry, network virtualization, etc.  Features supported by Calico:

 - Port/interface addition to Namespace
 - Policy - Global Network set, host endpoint, Network Policy
 - Routing - BGP (bird)
 - NAT
 - load balancing - workload info if available through policy of K8s.
 - NodePort - External connectivity

## Target Audience ##
Infrastructure programmers with existing Container networking deployment using K8s and its CNI PlugIns and are looking for a recipe to begin porting them for either better performance/programmability on CPU cores and/or easier adoption of a hardware pipeline inside an IPU to reduce the CPU tax of deploying Containers. 
## Success Criteria: ##
Running P4 Kubernetes CNI agents on the IPU, configure a container to container network and interconnect pods running on the host, connected to the IPU via container dedicated queues (CDQ).  Measure the performance improvement (requests/second, bandwidth) and increase in scale on the host side.
## Ingredients ##
Following are the ingredients of this.
- CNI Agent & Manager Agent
- Calico w/ P4 plug-in deployment on K8s.
- OVS with P4Runtime gRPC
- P4 Target Backend (P4 DPDK or IPU Target)
- Test Infrastructure
- Deployment Model - K8s based deployment with Calico as CNI. CDQ on Xeon host injected in container namespace. The rule programming on CNI agent side will be sent directly to the infrastructure, which will also contain a datastore to save configuration conversions and runtime configurations. 


# Development #

This Recipe is in development using the [Slack](https://join.slack.com/t/ipdkworkspace/shared_invite/zt-xb97bi1d-Q0NY9YC3PYv3LTw~HngVbA "IPDK Slack") for coordination.  This Recipe does not include any OpenStack components or kubernetes native component changes. All configuration is managed at a lower layer so that upper layer are not affected.
