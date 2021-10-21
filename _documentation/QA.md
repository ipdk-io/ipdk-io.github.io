---
title: "IPDK Q+A"
layout: documentation
visibility: public
---

**Q:           What is the IPDK?  How does it differ from other DOCA?**

A:            IPDK, or Infrastructure Programmer Development Kit, is an open source, vendor-agnostic framework of drivers and APIs for infrastructure offload and management that runs on a CPU or an IPU.  IPDK runs in Linux and uses a set of well-established tools such as SPDK, DPDK, Quick Assist and P4 to enable network virtualization, storage virtualization, workload provisioning, root-of-trust and offload capabilities found in the platform.  The components within IPDK, already optimized for Xeon servers, provide a common platform across CPUs and IPUs for increasing performance, optimizing resources and securing the infrastructure with an open-source eco-system.  According to the Nvidia website, DOCA is proprietary for Nvidia Bluefield products only.

**Q:           How does IPDK help customers?**

A:            In the case of existing FPGA SmartNICs customers are porting their existing infrastructure software to an embedded processor like XeonD and then use our APIs to insert functionality inline (between the host and the network). IPDK is a natural extension of this experience, finding the common utilities across the host and the embedded IPU processor AND providing an offload abstraction that decouples the accelerator implementation from the requirements of the customer. This allows the IPU to run the infrastructure in optimized software (DPDK, eBPF), FPGA RTL IP or hardened IP blocks in Mount Evans. This abstraction also gives them flexibility and choice in the next generation, being able to choose different implementations (and vendors) as the set of offerings grows over time.

**Q:           How is IPDK structured?**

A:           IPDK is the anti-thesis of the ‘one API to rule them all’. Instead it is a collection of Standard, domain specific development environments that are aligned and work together to enable customers to bring their own differentiation to the IPU platform. SPDK is one example- it comes out-of-the-box with NVMe-over-Fabric and NVMe-over-TCP, in addition to enabling customers to build their own custom block storage protocols that go well beyond what is spec’d within NVMe. With SPDK Infrastructure Programmers can build their own custom block lookup-hash-redundancy-store protocol (bringing in features from Ceph, iSCSI & open source objects stores) and use other tools in IPDK such as Quick Assist for Storage-At-Rest AES-XTS, Open Fabrics for Reliable Transport, and P4 for a programmable network to carry all of their traffic.

**Q:           How is IPDK related to P4?**

A:           In terms of innovation on top of the base platform coming from the Xeon host, P4 is where we are adding the most new value in the first release.  In this case we are bringing the Software Development Environment (SDE) of Tofino over to the host with both software pipelines (DPDK & eBPF) and hardware pipelines (Mount Evans & FPGA).  We use P4 to enable the Infrastructure Programmer to precisely define their design ‘intent’, a clear definition of the requirements of the dataplane.  They compile this down into their intended target (with the toolchain providing feedback on target ‘fit’ for their requirements) and when a new target becomes available, or when they are ready to move to the next generation, it boils down to a recompilation as opposed to adopting a new networking solution.  This is the tool in IPDK that we expect to gain traction with customers on both Xeon CPU and Intel IPU over time, as the Compiler flow enables us to optimize the customer’s program using the latest innovations inside Xeon as well as IPU hardware offload engines like the FXP.  The environment is standard, open, and fully accepting of other vendors to implement their own Compiler to compete within this same eco-system.

**Q:           How is IPDK related to P4?**

A:           In terms of innovation on top of the base platform coming from the Xeon host, P4 is where we are adding the most new value in the first release.  In this case we are bringing the Software Development Environment (SDE) of Tofino over to the host with both software pipelines (DPDK & eBPF) and hardware pipelines (Mount Evans & FPGA).  We use P4 to enable the Infrastructure Programmer to precisely define their design ‘intent’, a clear definition of the requirements of the dataplane.  They compile this down into their intended target (with the toolchain providing feedback on target ‘fit’ for their requirements) and when a new target becomes available, or when they are ready to move to the next generation, it boils down to a recompilation as opposed to adopting a new networking solution.  This is the tool in IPDK that we expect to gain traction with customers on both Xeon CPU and Intel IPU over time, as the Compiler flow enables us to optimize the customer’s program using the latest innovations inside Xeon as well as IPU hardware offload engines like the FXP.  The environment is standard, open, and fully accepting of other vendors to implement their own Compiler to compete within this same eco-system.

**Q:           How is IPDK source controlled?**

A:           IPDK is an open-source project that heavily leveraging existing open-source projects.  The prime directive of IPDK source control is to always upstream code changes and patches into the existing open source repositories (SPDK, DPDK, P4.org, OVS, SONiC, etc., etc.).  When there are additional components that don't fit well in an existing repo they can be kept of IPDK's public Git.  All software that is not hardware specific (such as backends for MEV, Tofino, etc.) must be open sourced, though code can be incubated in private repos until they are ready for public review.

**Q:           What is the point if everything in IPDK is in existing repositories?**

A:           IPDK is aiming for a consistent abstraction across different targets, including software targets.  Its one thing to go download DPDK- its an entirely different thing to use DPDK in a way that can provide a clean migration path to a Mount Evans IPU.  IPDK is tasked with defining how to use these open source projects in a way that enables choice in IPU implementation.

**Q:           What is the OS strategy for IPDK?**

A:           IPDK's only limit on the OS a customer can use is that we are developing for Linux (folks like VMware take our work in Linux and relate that to how it needs to be done in ESXio).  IPDK may choose to pick a particular distribution of Linux for certain use cases and/or validation scenarios.  Some attempt will be made to test IPDK components running together in a system on common distros (RHEL, Ubuntu, Debian).

**Q:           Is IPDK specific to IPUs?  Specific to Intel?**

A:           IPDK components can run on a CPU or an IPU.  It doesn't run on a NIC or a switch or an FPGA, it is software running in a compute complex.  It is not specific to Intel, and it is our stated goal to get other vendors such as Broadcom, Nvidia, Pensando and Xilinx to adopt the same abstractions in IPDK to provide a multi-vendor eco-system.  IPDK can be run on a host, or an IPU add-in-card, or in a connected device such as a middlebox or a ToR.

**Q:           What are some Infrastructure Programs?  Will Intel sell software on top of IPDK?**

A:           Example Infrastructure Apps are programs like a Custom Block Storage Protocol Initiator (e.g. Alibaba Pangu, Nutanix NVMeoF), an embedded Firewall, an SDN controller for Network Virtualization (OVN, Kubernetes CNI), or a management application to map the Virtual Devices of the IPU back into the backends that support them. This is an opportunity for Intel to explore productization of certain applications, the scope of which is outside of IPDK itself.

**Q:           What is IPDK funded for?**

A:           IPDK funding extends until Q2'2022, after which the head count burden would be assumed by the related product plans (Mt Morgan, Hot Springs Canyon, Tofino X, etc.).  The additional funding added in 2021 is specific to starting IPDK development ASAP and targeting existing platforms and/or already POP'd platforms that can support it (specifically Xeon Server, Mt Evans, ICXD+FM7 (Oak Springs Canyon) and Tofino 1/2/3).  IPDK funding builds on top of existing product funding and isn't a substitute for the software funding already in place, it is highly dependent on the programs to ensure that the right software components are in place to provide this consistency.

**Q:           Does IPDK require a POP?**

A:           No, the funding is allocated based on meeting specific milestones set in the IPU MRC, similar to how DPDK and SPDK is funded.  IPDK is production level software that customers can use in their production systems.
