---
title: "Infrastructure Application Interface"
layout: documentation
visibility: public
---
The Infrastructure Application Interface is:
1.  Standards Based - Curated from existing standards used by Infrastructure Apps
2.  RPC Based - The controlling application can run locally, remotely or a combination of the two

The Infrastructure Application Interface can also be thought of as the northbound interface out of the IPU container, representing the different RPCs supported in IPDK:

 - P4Runtime : Used for programmable networking dataplane
   - [Simple L3](https://github.com/ipdk-io/ipdk/blob/main/build/examples/simple_l3/simple_l3.p4) - Sample P4 program packaged in with P4 OVS
 - OpenConfig : Used for configuring physical ports, virtual devices, QoS and inline operations such as IPsec
   - Virtual Devices :  A new schema developed for IPDK that abstracts the instantiation of virtual devices connecting compute instances (VMs or bare metal hosts) to the infrastructure
   - [OpenConfig-Interfaces](https://github.com/openconfig/public/blob/master/release/models/interfaces/openconfig-interfaces.yang) -  Existing schema for managing physical ports connecting the infrastructure device to the network.  This schema was developed for switches and is used in the same way, even though the ports are commonly implemented in the kernel as NIC ports.
   - [OpenConfig-QoS](https://github.com/openconfig/public/blob/master/release/models/qos/openconfig-qos.yang) - QoS on the physical ports managed by the Interfaces schema.
 - Redfish / REST API : Used for infrastructure device lifecycle & platform management
   - Modeled after the capabilities found in [OpenBMC](https://github.com/openbmc/openbmc)
     - [Redfish Cheetsheet](https://github.com/openbmc/docs/blob/master/REDFISH-cheatsheet.md)
 - SPDK Storage Protocol : RPCs for software-defined storage
 - Managed Kubernetes : RPCs for controlling the infrastructure component of Kubernetes
 - Envoy xDS : RPCs for configuring Envoy

The IPU Container is an example implementation of the Infrastructure Application Interface, and when fully realized would look like the picture below:

![IPDK IPU Container](../IPDK_IPU_Container.png "IPDK IPU Container"){:width="90%"}

This isn't the only possible implementation of the interface, these components can be mixed/matched with other software components on the device.
