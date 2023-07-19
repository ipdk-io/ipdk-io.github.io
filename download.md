---
layout: download
title: IPDK Release
---

<span class="glyphicon glyphicon-download"></span> Latest Releases

Starting in 23.07, each Recipe is organized in its own repository.  Previous releases can still be found in the the [ipdk-io/ipdk/releases](https://github.com/ipdk-io/ipdk/releases) location as before.

* Network Recipe : [Releases](https://github.com/ipdk-io/networking-recipe/releases)
* Kubernetes Recipe : [Releases](https://github.com/ipdk-io/k8s-infra-offload/releases)

<a id="Release Process"></a>
## Release Process

The version names are in the format YY.MM.vv, where YY is year, MM is month, and vv is a minor version number and is often omitted. For example, the release in July of 2022 is version 22.07. The minor version is reserved for bug fix releases made at a later date that remain API compatible with the original release. IPDK makes no guarantees about API compatibility between releases with differing YY.MM versions, although every effort will be made to avoid breaking the API. Releases with identical YY.MM versions but differing minor version numbers are guaranteed to be API compatible.


<a id="Bug Reports"></a>
## Bug Reports

Bug reports may be filed using <a target="_blank" href="https://github.com/ipdk-io/ipdk/issues">GitHub issues</a> and should indicate the version of IPDK in question (or say master for the latest). Bugs will always be fixed on the master branch first, but may be back-ported to either of the two most recent releases if:

* A user requests the back-port by commenting on the issue stating to which version they’d like the bug back-ported
* The bug fix does not require a breaking API change

