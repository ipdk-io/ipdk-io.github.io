---
layout: download
title: IPDK Release
---

<a target="_blank" href="https://github.com/ipdk-io/ipdk-io.github.io/releases" id="Latest Release"></a>
## Latest Release

All releases of IPDK are available through <a target="_blank" href="https://github.com/ipdk-io/ipdk-io.github.io/releases" >GitHub</a>. GitHub serves as the master repository for all changes, so the master branch always contains the latest code.


<a id="Release Process"></a>
## Release Process

An IPDK release defines a public <a href="#">API</a> version, where the <a href="#">public API</a> comprises all of the C header files in the <a href="#">include/IPDK</a> directory. The version names are in the format YY.MM.vv, where YY is year, MM is month, and vv is a minor version number and is often omitted. For example, the release in JUly of 2022 is version 22.07. The minor version is reserved for bug fix releases made at a later date that remain API compatible with the original release. IPDK makes no guarantees about API compatibility between releases with differing YY.MM versions, although every effort will be made to avoid breaking the API. Releases with identical YY.MM versions but differing minor version numbers are guaranteed to be API compatible. IPDK makes no guarantees about <a href="#">ABI</a> compatibility between any two versions at this time.

IPDK uses a quarterly release cycle. The first two months of each quarter are an open window for merges. The final month of each quarter is intended only for bug fixes and documentation and so pull requests containing new features may be delayed, at the discretion of the maintainers.<a href="#">A high level roadmap</a> for the next release is always posted at the start of the release cycle. The roadmap may be discussed on the IPDK mailing list at any time, and feedback is very welcome.

<a id="Bug Reports"></a>
## Bug Reports

Bug reports may be filed using <a target="_blank" href="https://github.com/ipdk-io/ipdk-io.github.io/issues">GitHub issues</a> and should indicate the version of IPDK in question (or say master for the latest). Bugs will always be fixed on the master branch first, but may be back-ported to either of the two most recent releases if:

* A user requests the back-port by commenting on the issue stating to which version they’d like the bug back-ported
* The bug fix does not require a breaking API change

