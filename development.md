---
layout: development
title:  "IPDK Development"

---

<a id="license"></a>
## License

<a href="https://www.apache.org/licenses/LICENSE-2.0"> Apache License, Version 2.0 </a>

<a id="source_code"></a>
## Source Code

IPDK's source code is hosted by [GitHub](https://github.com/ipdk-io)

<a id="contributing"></a>
## Contributing

Everyone is welcome to contribute! Design pre-work and general discussion occurs via one of the
communications channels described on the [Community](/community/) page.

(Coming Soon) Patch submission is done through Gerrit where patches are voted on by everyone in the community.
A patch usually requires a minimum of two +2 votes before it will be merged. +2 votes are reserved for
the [core maintainers](#core) who can be contacted on the mailing list or in Slack.

<a id="guidelines"></a>
## Development Guidelines

These general guidelines help ensure that the SPDK development community remains fun, fair, and efficient.

* Developers should strive to be active on Gerrit in order to stay in the loop on upcoming changes.
* Coding and submission guidelines (i.e. being clear and concise in the commit message) should always be respected.
* Developers do not need to add specific reviewers to patches. Instead, the maintainers and everyone else in the community
should always be on the lookout for incoming patches. If a developer would like to be added to a review, or would like
a specific person added to their patch, they should feel free to do so.
* All comments on code reviews must be addressed prior to the patch being merged. Comments can be addressed by making
code changes or by replying to the comment.
* There’s no minimum or maximum time for the life cycle of a patch. A patch may be accepted
in hours or possibly weeks or longer. How efficiently our community operates is a direct result of how well our
community developers interact with each other.
* Patch authors, including core maintainers, may not vote +1 or +2 on their own patches.  They may vote -1 on
their own patches to signify that the patch should not be committed.

<a id="core"></a>
## Core Maintainers

The IPDK core maintainers primary responsibility is to provide technical oversight for the IPDK Project.
The current list of IPDK core maintainers includes:

* Namrata Limaye
* Venkata Suresh Kumar P
* Sandeep Nagapattinam
* Dan Daly
* Kyle Mestery


The bulk of this technical oversight is achieved through reviewing and approving patches.  Patches
must receive +2 votes from two core maintainers and a +1 vote from the IPDK automated test pool before
it can be committed.  Only core maintainers have the ability to add a +2 vote and commit patches.  Core
maintainers may also vote +1 on patches if they have reviewed the patch but cannot provide an expert opinion
in an area of code with which they are not as familiar.

Under rare circumstances and at the discretion of a core maintainer, a patch may be committed with only one
+2 vote.

Other roles and responsibilities of the core maintainers include:

* Setting code review and development guidelines
* Making decisions on community processes
* Role modeling good development practices
* Fostering a positive, productive community
* Participating in project roadmap definition
* Identifying and organizing development tasks

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

* Dan Daly
* Jim Harris
* Namrata Limaye
* Paul Luse

<a id="current"></a>
## Current CVEs

[Click here for a list of all IPDK CVE entries.](https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=ipdk)
