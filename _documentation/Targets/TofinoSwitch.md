---
title: "Tofino-based Intelligent Switch"
layout: documentation
visibility: public
---

## Supported Infrastructure Application Interfaces ##

 - P4Runtime (via OVS)
 - OpenConfig (via OVS)

Tofino-based switches operate solely over physical ports, the virtual devices OpenConfig schema is not supported.

## Supported Target Abstraction Interfaces ##

Tofino supports the PSA (Portable Switch Architecture) and TNA (Tofino Native Architecture) P4 architectures.  Both types of P4 pipelines can be populated at runtime using the Table-Driven Interface (TDI).
 
## How to Build ##

Requires [Intel P4 Studio SDE](https://www.intel.com/content/www/us/en/secure/confidential/collections/programmable-ethernet-switch-products/p4-suite/p4-studio.html?s=Newest "P4 Studio Download") version [9.7.0](https://cdrdv2.intel.com/v1/dl/getContent/669803 "P4 Studio 9.7") or later.  A software license agreement (SLA) is required for download and use.

Instructions and an installation guide can be found [here](https://github.com/ipdk-io/ovs/blob/ovs-with-p4/Documentation/intro/install/ovs-with-p4-tofino.rst "ovs-with-p4-tofino").

More information can be found at intel.com: <a href="https://www.intel.com/IFP">intel.com/IFP</a>

