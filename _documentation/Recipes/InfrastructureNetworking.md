---
title: "Infrastructure Networking"
layout: documentation
visibility: public
---

# Infrastructure Application Interface #
**Virtual Devices**:  Offered to the tenant instance, device types include:
- virtio-net
- vmxnet3

**Virtual Device Management**:  Interface to orchestration to hotplug virtual devices into instances, or associate a VF with an emulated device in an instance using vDPA.
In IaaS we want to define a set of generic virtual devices that are offered to the tenant.  The tenant instance could be a VM or a physical machine (bare metal hosting).  In both cases the semantics of how a virtual device is 'added' to an instance is using PCIe hotplug, exactly the same as KVM.



The steps to hotplug a new device is as follows:

![Hotplug](../img/IaaS-NW-Hotplug.png "Hotplug"){:width="90%"}

1. Over OpenConfig, create a new virtual port (specifying the type, number of queues, etc.).  
2. This new virtual port is associated with a netdev in P4 OVS, and a corresponding port device is hotplugged into the host or VM.  Any exception traffic from that hotplug'd device will arrive on this netdev.  Any traffic P4 OVS wants to direct to this device can be sent over this netdev as well.
3. The tenant instance loads the corresponding driver for that device and can now send/receive traffic
4. The virtual private cloud dataplane moves traffic to/from the instance, sending exceptions to the infrastructure software when needed.

An extension to the bare metal host server usage is to run VMs inside of it and be able to support VMs inside of that host.  In this (nested) case vDPA (virtio data path acceleration) is used to connect the infrastructure directly into the VM while still preserving Live Migration.  In this case the physical function is still hotplug'd into the server, at which point the host server sets up a number of VFs that can be associated with emulated devices inside VMs.  This has a similar flow as before, except that the port creation config needs to include which VF to use, and this VF is not hotplugged into the VM, the VM devices remain emulated and are accelerated using vDPA.

![Associating VFs with VMs](../img/IaaS-NW-VF.png "Associating VFs with VMs"){:width="90%"}

1. Over OpenConfig, create a new virtual port that specifies a PF and VF #.  This assumes that the corresponding PF has already been hotplug'd into the host.
2. This VF on the IPU side is assigned a netdev in P4 OVS.  Any exception traffic from that VF will arrive on this netdev.  Any traffic P4 OVS wants to direct to this VF can be sent over this netdev as well.
3. An emulated driver in the VM (either existing or newly hotplug'd in) is associated with the VF in the host (Note:  the VF is not passed through into the VM).  vDPA ensures that data is moved in and out of the VM using the device virtual function, providing a direct connection between VM and infrastructure (high performance, low latency).  vDPA can also enable Live Migration when needed on this server.
4. The virtual private cloud dataplane moves traffic to/from the instance, sending exceptions to the infrastructure software when needed.

# Target Abstraction Interface #

**P4 Programs**:  For the P4 definable sections of the dataplane, defines the packet processing logic.  The dataplane may consist of multiple P4 programs working in conjunction.

**Fixed Function Tables**:  For non-P4 functionality configurable through Openconfig, the kernel and/or SAI.  This includes the physical ports, virtual devices and QoS configuration tables inside the datapath.

**Table Driven Interface**:  Allows the P4 pipeline to be implemented in different ways, and for the target pipeline implementation to be chosen at runtime.

![P4 OVS](../img/IaaS-P4-OVS.png "P4 OVS"){:width="90%"}

The Target Abstraction Interface sits inside P4 OVS and splits it between the OVS dataplane and the control plane.  P4 OVS generates a P4 pipeline that contains a set of P4 tables and structures for implementing a datapath for Linux networking as well as a set of P4 tables and structures that can be controlled by an SDN controller over P4Runtime (as an alternative to OpenFlow).  The Linux kernel can be used to set up bridges, routers, VXLAN or Geneve tunnels, IPsec tunnels and ACLs to process packets in a standard way.  The kernel is also the mechanism for providing redundancy across physical uplinks to multiple top-of-rack switches, either by using teamd for Link Aggregation (LAG) or by running a routing stack and doing ECMP and BFD to peer with the rest of the network.  P4 OVS allows a custom P4 program to be run inside virtual L2 bridges for additional processing such as stateful ACLs (using connection tracking) for OpenStack Security Groups, load balancing for Kubernetes and per-flow QoS and telemetry.

The Table Driven Interface (TDI) provides an abstraction layer to allow the P4 pipeline to be implemented in different ways, and for the target pipeline implementation to be chosen at runtime.  Both a P4 DPDK and a P4 eBPF target are available.

# Virtual Device Table #
To implement the virtual-device openconfig objects the TDI includes a table of virtual devices that lists out all of the currently active virtual devices and their associated configuration.  The name must be unique and is used as a key in the list.  

{:class="table table=bordered"}
|Device Name|Type|Configuration|
|:---|:---|:---|
|Example1|'virtio-net'|virtio-net-config1|
|Example2|'virtio-blk'|virtio-blk-config1|
|...|||

In the target it needs to be capable to hotplug or enable a device based on entries being populated in this table.  In software targets qemu is used to hotplug new devices into VMs, while hardware hypervisors are able to hotplug devices directly into the attached host.  The virtual device table abstracts the implementation of how these devices are added into their hosts/guests.

# Build Script #

Find more information on how to build this [here](https://github.com/ipdk-io/ipdk/blob/main/build/README.md "IPDK Container").
