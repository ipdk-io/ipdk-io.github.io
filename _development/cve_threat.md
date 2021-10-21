---
layout: development
title:  "IPDK Common Vulnerabilities and Exposures (CVE) Process"

---

<a id="cve"></a>
## Common Vulnerabilities and Exposures (CVE) Process

The IPDK CVE process is designed to be simple yet effective. The process is here to help make sure that security
vulnerabilities are dealt with efficiently, and with the least amount of advertising possible. An IPDK CVE sub-team
exists to handle this process. If you are interested in joining please contact one of the IPDK maintainers.
Issues can come from anywhere but when one comes to the attention of the community the sub-team leader should
be notified via private communications ASAP. This is to ensure that we don't advertise possible vulnerabilities
before they are fully understood.

If you believe you have identified a potential security issue, please contact the sub-team directly via private
email (see below), do not discuss on Slack or report the issue in GitHub.

Sub-team members are responsible for the following process:

1. Upon receiving a notification of a security vulnerability, the sub-team leader will call for a sub-team meeting
to discuss the potential issue.
2. The sub-team will identify the resources required to investigate and determine the scope of the vulnerability, including a fix or workaround.
3. When the fix or workaround has been identified, the sub-team will approve it or ask for further investigation.
4. Once approved, the patch will be submitted via normal channels without verbose information on the vulnerability
itself. It will simply state what the patch is doing (not why).
5. Once the patch is merged, the most recent official release will be used as a baseline for a maintenance release and will
include only the fix(es) identified for the issue at hand.
6. Once the release is tagged, the sub-team leader will file an issue with the [CVE Org](https://cve.mitre.org)
7. After the issue has been filed, an announcement will be made on the mailing list with more information about
the patch and the fix so that community members can decide for themselves what their exposure is and when, if at
all, they should move to the new release.

CVE Sub-Team Members:

* Dan Daly, dan.daly@intel.com
* Jim Harris, james.r.harris@intel.com
* Namrata Limaye, namrata.limaye@intel.com
* Paul Luse, paul.e.luse@intel.com

<a id="current"></a>
## Current CVEs

[Click here for a list of all IPDK CVE entires.](https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=ipdk)
