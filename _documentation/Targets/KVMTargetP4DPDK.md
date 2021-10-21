---
title: "KVM Target w/ P4 DPDK Dataplane"
layout: documentation
visibility: public
---

## Supported Infrastructure Application Interfaces ##

 - P4Runtime (via OVS)
 - OpenConfig (via OVS)

KVM supports the virtual devices OpenConfig schema using qemu command line to enable virtual devices directly into guests.

## Supported Target Abstraction Interfaces ##

P4 DPDK is used as the P4 programmable network dataplane and supports both the PSA (Portable Switch Architecture) and PNA (Portable NIC Architecture) P4 architectures.  The resulting P4 pipeline can be populated at runtime using the Table-Driven Interface (TDI).

SPDK is used to support the storage dataplane in this target.  Underneath the TDI operations on virtual disks are converted into configuration calls into structures in SPDK.

## How to Build ##

The KVM P4 DPDK target is the default used in the build script for OVS which can be found <a href="https://www.github.com/ipdk-io/ipdk/tree/master/build">here</a>

