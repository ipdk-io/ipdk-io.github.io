---
title: "HOWTO IPU"
layout: documentation
visibility: public
---
In order to start to migrating Infrastructure Applications off of the host and onto the IPU there are a few necasary steps. There are also a couple of optional steps that help you scale your applications and get more out of this new type of device.

## Required Steps:
 * [Choose Your IPU Operating System](#Choose_Your_IPU_Operating_System)
 * [Define How Your IPU is Secured](#Define_How_Your_IPU_Is_Secured)
 * [Define Your IPU's Deployment Lifecycle](#Define_Your_IPUs_Deployment_Lifecycle)
 * [Define Your Host Interface](#Define_Your_Host_Interface)
 * [Start Porting Applications](#Start_Porting_Applications)

An example deployment of an IPU with just the required steps is [here](#Deployment_Example_Required_Steps_Only).

## Optional Steps:
 * [Host Management Offload](#Host_Mgmt_Offload)
 * [Hardware P4 Pipeline](#Hardware_P4)
 * [Networking Crypto Offload](#Network_Crypto)
 * [Storage Crypto](#Storage_Crypto)
 * [TLS Offload](#TLS_Offload)
 * [Compression Offload](#Compression)
 * [Transport Offload](#Transport_Offload)
 * [Power Management](#Power_Management)

An example deployment of an IPU with all of the options enabled is [here](#Deployment_Example_All_Options).

# Required Steps

<a id="Choose_Your_IPU_Operating_System"></a>
## Choose Your IPU Operating System

An IPU can be thought of as a special purpose CPU optimized for running infrastructure applications.  Therefore it is likely that the most important decision around bringing IPU into your fleet is determining what OS will run on it.  Most developers deploying IPUs today take one of two paths:
- **Re-use the Host Server's OS**:  Port the host server's operating system to IPU, in many cases having the exact same OS in both the host and the IPU.
- **Re-use the Network's NOS**:  Port the operating system being used in the network switches, in many cases having the exact same NOS in both the top-of-rack switch and the IPUs.

The decision on OS sets the direction on how the IPU is managed, secured, deployed and monitored throughout its lifecycle.  In this way you can add your IPUs into an existing fleet or manage them separately as a new resource group.

<a id="Define_How_Your_IPU_Is_Secured"></a>
## Define How Your IPU Is Secured

The IPU can act as a control point on the host platform and as a result usually has a direct connection to a central point of management / orchestration.  By default the IPU trusts nothing- it does not trust the host it is attached to, the boot image it is assigned or input on its network or console interfaces.  In order to connect to this point of management / orchestration in a secure way trust must be established and then preserved during operation.  Key aspects to consider:
- **Root Of Trust**:  How to ensure that only trusted code is executed on the cores inside the IPU.
- **Secure Boot, Update & Recovery**:  Boot image authentication using the root of trust.  The boot image for the IPU can be pulled from a disk local to the IPU or from the network.  Remote image update & recovery ensures remote software delivery without requiring physical interaction with the device.
- **Management Credentials**:  Credentials stored in the boot image to enable a bi-directional secure connection between the central point of management and the IPU.
- **Opaque Keystore**:  A write-only storage of cryptographic keys, each referenced with a handle to be used by different accelerators within the IPU.

The IPU may also act as a proxy for how the host is managed & secured, offloading server management to the IPU.

<a id="Define_Your_Host_Interface"></a>
## Define Your Host Interface

A differentiating feature of an IPU is that it is not a peripheral to the host (despite being attached over a system bus like PCI!).  Instead the IPU is going to establish a set of host interfaces (defined in software) of its own choosing that may change and evolve over time.  This provides a level of hardware separation between host apps and the infrastructure that serves it.  Usually the host is unaware that an IPU is physically plugged in over PCI, it can only see these virtual software defined devices on the bus.  How the IPU presents itself to the host is a concept borrowed from hypervisors presenting devices into virtual machines- using the same 'PCIe hotplug' common across all modern OSes devices are dynamically added and removed.  To standardize these semantics across KVM software backends and IPU hardware backends IPDK defines a set of **Host Virtual Device APIs** that enable orchestration to insert and remove these virtual devices into the host dynamically.

- **Virtual Ports**:  Plug/Unplug a virtual port into the host and set SLAs like the 'virtual link speed'
- **Virtual Disks**:  Plug/Uplug a virtual disk into the host and set SLAs like the 'virtual disk max IOPS'
- **Virtual Container Queues**:  Split a virtual port into individual devices that can support a CNI and has hardware queues dedicated to the container pod.
- **Localhost Sockets**:  Establish a raw socket capable of carrying messages to/from the host and Infrastructure applications running on the IPU.
- **Virtual Fabric Ports**:  Plug/Unplug a virtual fabric port that provides a low latency / high bandwidth OFI device connection.
- **Virtual Accelerators**:  Plug/Unplug a virtual accelerator that exposes its own device model such as oneAPI Level Zero.

<a id="Define_Your_IPUs_Deployment_Lifecycle"></a>
## Define Your IPUs Deployment Lifecycle

Once your IPU has booted securely and is added to the fleet it has to be tracked, managed, debugged and at some point eventually decommissioned.  All of this must be done without any physical interaction with the card AND in most cases without any interaction from the attached host (host is untrusted by default).  Key aspects to consider:
- **Device ID**:  This IPU's unique identifier back to the central manager so that it can be added into the fleet and tracked through its lifecycle.
- **Associating Host <-> IPU**:  Determining which host in the fleet this IPU is attached to. 
- **Board Management Controller (BMC) Interface**:  Depending on the deployment model the IPU may have its own BMC or share the BMC found on the host motherboard.  In either case this BMC must be remotely reachable even when the IPU's primary cores are off, in reset or inoperable.  The BMC is also responsible for remotely powering up/down the IPU.
- **IPU & Host Power Up Sequence**:  Often the IPU is booted well before the host and establishes a link with orchestration before the host is started up.  Depending on the form factor the IPU & Host may still share certain platform functions such as power and fans.  This is often sequenced at the management orchestration level.  
- **IPU Core Reset, Debug, Core Dump & Telemetry**:  Similar to what is found on the host cores there needs to be capability to be able to remotely reset the IPU cores as well as debug, monitor and track their operation.  Telemetry information and core dumps must be accessible even if the cores cease to function.
- **Network Interface Reset, Debug & Telemetry**:  Similar to what is found on the host networking interfaces there needs to be capability to be able to remotely reset the network interfaces as well as debug, monitor and track their operation.  Telemetry information on the network must be accessible even if the network link ceases to function (using another communication path that doesn't use the downed link).

<a id="Start_Porting_Applications"></a>
## Start Porting Applications

The IPDK container comes with a set of applications already ported and interfaced with the APIs needed to create devices on the host and interconnect them with the networking and storage control plane frameworks on the IPU.  These reference applications can be used to get going and start serving up infrastructure.  When porting new applications to IPU it is a new execution environment with different constraints on the type and number of cores, amount of storage, amount of memory and availability of peripherals.  It also has a new set of devices (called **Inverse Devices**) that are used to connect back into the host.  Some things to take into consideration:

- **Compiling for IPU Cores**:
An IPU can come with x86 or ARM-based cores which may require a cross compile.  Your application regression testing will need to be rerun with care given to changes in CPU architecture that could introduce new bugs (endian-ness, vectorization, caching, special instructions, compiler optimizations, etc.).
- **On-board Storage for Apps & Logging**:  Most IPU platforms will attach an SSD for boot, application storage and for logs.  This will likely be less on-board storage than what your application is accustomed to, so care should be taken to ensure that the on-board storage is not overwhelmed over time.  When the storage does inevitably fill up the system should still continue to operate.
- **On-board RAM and Swap Space**:  Infrastructure Applications tend to use large amounts of memory, and the IPU will have less memory than what is in the host.   
- **High Speed Ethernet Devices**:  The IPU manages its own 10/25/50/100/200GbE Ethernet ports just like a regular server or switch would, and you can expect the same type of device drivers here on the IPU.  Kernel drivers manage the ports, serdes, MACs, and configuration and are often the same or similar to what you would find on a host or switch system.
- **Management Ethernet Device(s)**:  Most IPU adapter cards or motherboard applications will connect one or more 1G management networking interfaces.
- **Management Console Device(s)**:  Most IPU adapter cards or motherboard applications will connect the IPU core's console to a connector, often plumbed into the attached BMC.  Some IPUs have secondary management core complexes that have their own consoles and these may also be available on the board or connected through the BMC for debug while in deployment.   
- **Inverse Host Devices**:  An inverse host device is a device plugged into the IPU's operating system and represents traffic coming from the host to the IPU.  They can also be used to send traffic back from the IPU to the host.  They come in two flavors:
	- **Inverse Host Kernel Devices**:  These devices often require IPU specific drivers and come up as devices in the kernel (for example a netdev).  They are also often split up with individual netdevs representing the device on the host where traffic is moving in and out of, similar but not the same as what switchdev provides.  These devices are used to interface with existing kernel control planes such as sending/receiving ARP and DHCP packets to/from instances on the host.
	- **Inverse Host Userspace Poll Mode Drivers (PMDs)**:  These devices are running in userspace using the same constructs from DPDK and are used to handle high speed / high event rate dataplane and control plane operations.  In this case the enumeration of what device data is coming to/from is set using custom metadata tags added to the traffic as it moves across the PMD.

<a id="Deployment_Example_Required_Steps_Only"></a>
## Deployment Example (Required Steps Only)

The Linux distribution from the host is chosen, with the Linux kernel version updated to the minimum version needed to run this OS on the IPU.  The IPU is secured and deployed in the same way as the attached host.  The IPU offers the host virtio-net and virtio-blk devices based on configuration from orchestration, including exposing a virtio-blk boot disk used to boot the host's OS.

The IPU may have a default network configuration which may include putting the virtio-net ports into the host on a virtual network using tunnels or NAT.  The vSwitch and/or networking dataplane can run on the IPU cores or optionally in a programmable hardware pipeline.  The storage backend supporting the virtio-blk devices would run in software as it did in the host, using SPDK as one possible scenario.

Managing the software running on the IPU would happen over the management plane talking to either the BMC on the IPU card or the System BMC inside the server.  Updating the IPU core's software, the BMC's software and the IPU firmware is all done through this path.  Telemetry and crash dump information is also accessible through the same mechanism, and is always on even if the main cores running Infrastructure Apps on the IPU are off or not responsive.  
 
# Optional Steps

Migrating apps from CPU to IPU brings a suite of advantages- hardware separation of host and infrastructure apps, IPU control of the host interface, and separation of the software that runs on the host and the IPU, allowing the host to run whatever it needs to serve its business purpose.  It also introduces a new challenge where the Infrastructure Apps need to be efficiently packed into the IPU's resource footprint.

IPUs contain a set of acceleration functions that are targeted at offloading the logic in the IPU, saving cycles, memory and disk space.  A significant portion of the heavy lifting can be done in specialized programmable processing units in hardware.  In the next sections we show how these accelerators improve performance, reduce IPU power, lower latency and alleviate the constraints around fitting all of your Apps on an IPU compute complex.

<a id="Host_Mgmt_Offload"></a>
## Host Management Offload

The IPU is able to manage what runs on the host to support a bare metal hosting model.  The IPU is able to boot its OS before the host's and provide either a boot disk or a network boot path that returns the boot image provided by the orchestration layer.

Depending on the form factor the IPU may also have control of the server platform, either in conjunction or in replacement of the System BMC.  This enables controlling server reset, monitoring and security.  Remote access to the server's console and crash logs can also be facilitated through the IPU in the same way.

During regular operation the IPU will control what network and storage I/O the host sees on its PCI bus.  The **Host Virtual Device APIs** can be used to add and remove devices to the host using similar semantics to how devices are added and deleted using qemu. 

<a id="Hardware_P4"></a>
## Hardware P4 Pipeline

Target a Hardware-based P4 Pipeline by defining your packet processing pipeline in P4, compile it to your target and replace your software-based pipeline with a hardware implementation.

<a id="Network_Crypto"></a>
## Network Crypto

Inline IPsec crypto. 

<a id="Storage_Crypto"></a>
## Storage Crypto

Inline AES-XTS storage-at-rest encryption + CRC lookaside offload.  Storage fastpath usage models

<a id="TLS_Offload"></a>
## TLS Offload

TLS Record encrypt / decrypt

<a id="Compression"></a>
## Compression Offload

Compression of data carried over both the networking and storage datapaths.

<a id="Transport_Offload"></a>
## Transport Offload

Hardware based L4 transports with hooks integrated for customizing the congestion control algorithms across the network.

<a id="Power_Management"></a>
## Power Management

Optimize IPU power usage during regular and peak operation by reducing the average power consumption of the IPU as well as gracefully handling the peak power scenarios.

<a id="Deployment_Example_All_Options"></a>
## Deployment Example (All Options Checked)

Same example packet flow from  **IPUs Deployment Lifecycle**.  Networking pipeline compiled in P4 and run in hardware, including inline IPsec.  Storage leverages lookaside offloads.  Infrastructure Apps can a) use TLS offload lookaside b) leverage an optimized L4 transport c) push traffic into the P4 pipeline for networking offload d) apply BKMs around managing power consumption.  

