---
title: "Target Abstraction Interface"
layout: documentation
visibility: public
---

The Target Abstraction Interface (TAI) is an abstraction exposed by an infrastructure device running infrastructure applications that serve connected compute instances (attached hosts and/or VMs, which may or may not be containerized).  The infrastructure device may also contain an isolated Infrastructure Manager used to help manage the lifecycle of the device.

The components of the TAI must be:
1.  Standards Based - Curated from existing standards for programmable targets
2.  Driver & Library Based - Applications in the infrastructure link with the library components of TAI to program the control plane.  Applications in both compute instances and in the infrastructure use device drivers for dataplane operations such as moving packets or stored data.
2.  Capabilities Based - Curated from standards that have capabilities interfaces such that the applications can query the target to understand its capabilities up front even before the target is deployed.

The Target Abstraction Interface is curated to be target independent and target agnostic without being a lowest common denominator interface that ends up obfuscating the target capabilities below it.

The TAI is constituted of:
1.  Virtual Devices:  Device abstractions that the infrastructure can plug into the compute instances that uses it.
2.  Lifecycle Control:  Control Plane interface for managing the device that the infrastructure is running on (update, monitoring, reset & recovery).
3.  Accelerator Control:  Control Plane interface for accelerators at the disposal of infrastructure applications

# Virtual Devices

Virtual devices interact with compute instances (hosts and virtual machines, which may also be containerized) using PCI hotplug which is assumed to be supported in the compute instance's operating system (as it is well supported across the broad set of possible OSes that could be running).

## Network Devices

Supported Network Devices:
 - virtio-net : 0.95 support is mandatory, newer versions can be negotiated

## Block Storage Devices

Supported storage devices:
 - virtio-blk : 0.95 support is mandatory, newer versions can be negotiated including virtio-scsi
 - NVMe : supported a disk controller device which can hold multiple block devices using namespaces

# Lifecycle Control

Infrastructure 'devices' operate independently from the compute instances that they serve (whether these instances are hosts or VMs).  This creates three independent domains that can be powered up, down and reset from the Lifecycle Control interface:

 - Instance Domain(s) - one or more
 - Infrastructure Device Domain - one
 - Infrastructure Management Domain - zero or one

In certain systems these domains are not fully independent, and one capability of Lifecycle Control is to report up to management applications where domains are tied together (shared fate).

The lifecycle commands below can be invoked locally through an API or accessed through a control protocol in the Infrastructure Application Interface (ie redfish).

Mandatory lifecycle commands
 - soft power up/down (domain) : Given the supplied domain, set the soft power to this domain
 - hard power up/down (domain) : Given the supplied domain, set the hard power to this domain
 - reboot (domain) : Given the supplied domain, trigger a reboot
 - readlog (domain) : Given the supplied domain, read out the current log.
 - clearlog (domain, entries) : Given the supplied domain, clear out the log entries specified.
 - readdump (domain) : Given the supplied domain, read out the latest core dump.
 - cleardump (domain, entries) : Given the supplied domain, clear out the core dump entries specified
 - add boot source (domain, config) : Given the supplied domain, configure a boot source for that domain.  Configuration can be boot from PXE, network, or local disk.
 - set boot order (domain, order) :  Given the supplied domain, configure the boot order based on availability of the boot sources provided in the above command.
 - recover (domain) : Attempt to boot the supplied domain into its immutable recovery boot source

Optional lifecycle commands
 - add / remove image : Load images into the infrastructure to be associated with a domain's boot source.
 - set time server : Set up a time server for use in the infrastructure
 - set name server : Set up a name server for use in the infrastructure
 - revoke key : Revoke a key used for the secure booting of a domain

# Accelerator Control

Accelerator Control can be qualified as consisting of two types of components:  device libraries w/ APIs and device drivers.

## API Linkable Libraries

 - [Table Driven Interface](https://github.com/p4lang/tdi) : A linkable library API that is target agnostic and enables targets to be dynamically linked with applications at runtime.  The TDI sits at the bottom of the P4Runtime and OpenConfig servers inside IPDK enabling a generic API to all possible targets.  This facilitates compiler driven config space (using p4info) as well as static table config space used in OpenConfig (physical devices, virtual devices, QoS, management).
 - SAI-to-TDI : A wrapper around TDI to provide SAI (Switch Abstraction Interface) APIs to an application on top of a target that supports TDI and is running a SAI compatible P4 program.
 - Programmable Tables : Tables derived from the compilation of P4 programs into the target.  These tables are defined by the p4info artifacts that are produced after successful compilation.  These programmable tables are focused on the networking dataplane- switching, routing, flows, ACLs, tunnels, connection tracking, etc. including any inline functions such as inline crypto.  For the SAI interface to be supported there must be mappings from SAI into the programmable tables (for example mapping routing operations to routing tables).
 - Fixed Tables : Tables defined in a schema and agreed upon by the application and the target as being required for this usage.
   - Link Management :  The management of networking links coming in and out of the infrastructure device
     - Get/Set PHY Config & Debug
     - Get/Set MAC Config
     - Get Link Status
     - Link Setup, Auto-Negotiation
   - Virtual Device Management :  The management of virtual devices presented up into compute instances.  These are represented in a hash table based on a device key
     - add/remove virtual-device <name> <instance> <type> <config> <state>
       - Name:  Unique String per device
       - Instance:  Instance to associate with the device, leave blank if there is only one instance
       - Type:  One from the set of supported types: virtio-net, virtio-blk, virtio-scsi, NVMe.
       - Config:  All devices will have the following shared config:
         - Config Version:  Version of this config object, default is 1
         - Device Version:  Device specific version for example 0.95 or 1.0 for virtio.  Default is zero which disables the rate limiter
         - Config Bandwidth Limit:  Requested bandwidth limit, in Megabits per second.  Default is zero which disables the rate limiter
         - Config Requests/sec Limit:  Requested requests/sec (for a port this is transmit packets/sec), in Requests per second
         - Admin:  Set to DOWN to disable the device.  Default is UP
         - Host Virtual Device:  For host virtualization on an infrastructure device only.  Specify the hardware device on the host to associate this virtual device with.  Default is zero which implies hot plug.
         - Host Virtual Function:  For host virtualization on an infrastructure device only.  Specify the virtual function on the host virtual device to associate this virtual device with.  Default is zero which implies hot plug.
       - Stats:  All devices will have the following shared statistics:
         - Statistics Version:  Version of the stats object, default is 1
         - Status:  String representing the device state (UP, DOWN, ERROR)
         - Instance Config:  String representing this device's configuration into the instance
         - Transmit Bytes:  Number of bytes transmitted by the instance's driver
         - Transmit Packets:  Number of packets/requests transmitted by the instance's driver
         - Receive Bytes:  Number of bytes received by the instance's driver
         - Receive Packets:  Number of packets/requests received by the instance's driver
         - Actual Bandwidth Limit:  Device's bandwidth limit, in Megabits per second.  Zero means no limit is running on the device.  May differ from requested limit.
         - Actual Requests/sec Limit:  Requested requests/sec (for a port this is transmit packets/sec), in Requests per second.  Zero means no limit is running on the device.  May differ from requested limit.
         - Discard Bytes:  Number of bytes sent from the instance's driver that were discarded by the device
         - Discard Packets:  Number of packets sent from the instance's driver that were discarded by the device
 - - QoS Management:  The management of QoS elements in the dataplane, reflecting the amount of hierarchy and capabilities within each level
 - - IPsec Management:  For inline crypto (when supported) the loading of security associations and associating them with an index to be used in other places in the dataplane

## Device Drivers

Supported Devices
 - Linux netdev : Used for moving traffic in and out of the infrastructure, between the instances and infrastructure device as well as between the network and the infrastructure device.
 - Inverse block device :  Used for moving storage requests and completions between instances and the infrastructure device.  Block storage requests arrive from the instance(s) and in the other direction block storage completions form the infrastructure device's responses to these requests.
 - Crypto device :  Used by infrastructure applications to pass data to a lookaside crypto engine that is returned either encrypted or decrypted.
 - Compress device : Used by the infrastructure applications to pass data to a lookaside compression engine that is either compressed or decompressed.
