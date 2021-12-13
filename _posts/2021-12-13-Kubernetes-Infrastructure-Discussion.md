---
layout: post
title:  "Two Meetings on Kubernetes Infrastructure"
author: Dan Daly
categories: news 
---

***[Kubernetes Networking Infrastructure Teams Call](https://teams.microsoft.com/l/meetup-join/19%3ameeting_NzAwMjMzOTItMzAxZC00MjM4LTgwMjQtNDFkZTYxYTQ1NGZi%40thread.v2/0?context=%7b%22Tid%22%3a%2246c98d88-e344-4ed4-8496-4ed7712e255d%22%2c%22Oid%22%3a%221232290d-c824-4050-a582-15598b1d126b%22%7d)*** <a href="https://calendar.google.com/event?action=TEMPLATE&amp;tmeid=NGxwbDl0aHI3cWYxbDhxdTRkZDJmanQwdmIga29hdDliOTEyYWhqazBuZmVqaTUydWZhNW9AZw&amp;tmsrc=koat9b912ahjk0nfeji52ufa5o%40group.calendar.google.com">Jan 11th @ 8am PT</a> & ***[Kubernetes Dataplane Offload Teams Call](https://www.google.com/url?q=https://teams.microsoft.com/l/meetup-join/19%253ameeting_NjU0Y2M5MzctZmQ0MS00MGY4LWFjNzctYTkyZDNiOGE3Yzll%2540thread.v2/0?context%3D%257b%2522Tid%2522%253a%252246c98d88-e344-4ed4-8496-4ed7712e255d%2522%252c%2522Oid%2522%253a%25221232290d-c824-4050-a582-15598b1d126b%2522%257d&sa=D&source=calendar&usd=2&usg=AOvVaw1MfmZaQUvuUJ1XC8q9IySN)*** <a target="_blank" href="https://calendar.google.com/event?action=TEMPLATE&amp;tmeid=M3NvYzVvY3ZyazU0NHU5dGlmMGZxdHJjNzkga29hdDliOTEyYWhqazBuZmVqaTUydWZhNW9AZw&amp;tmsrc=koat9b912ahjk0nfeji52ufa5o%40group.calendar.google.com">Jan 12th @ 8am PT</a>  

<a href="https://calendar.google.com/event?action=TEMPLATE&amp;tmeid=NGxwbDl0aHI3cWYxbDhxdTRkZDJmanQwdmIga29hdDliOTEyYWhqazBuZmVqaTUydWZhNW9AZw&amp;tmsrc=koat9b912ahjk0nfeji52ufa5o%40group.calendar.google.com"><img border="0" src="https://www.google.com/calendar/images/ext/gc_button1_en.gif">Jan 11th @ 8am PT</a>:  ***Kubernetes Networking Infrastructure***

[Teams Meeting](https://teams.microsoft.com/l/meetup-join/19%3ameeting_NzAwMjMzOTItMzAxZC00MjM4LTgwMjQtNDFkZTYxYTQ1NGZi%40thread.v2/0?context=%7b%22Tid%22%3a%2246c98d88-e344-4ed4-8496-4ed7712e255d%22%2c%22Oid%22%3a%221232290d-c824-4050-a582-15598b1d126b%22%7d)

Discuss different trust models for Kubernetes networking. The delineation between components remaining on the host compute and what must be separated as part of the infrastructure will determine the level of security isolation and types of offload between tenant and infrastructure. Different models may require new management, orchestration flows, and communication channels between the host and infrastructure components.

<a href="https://calendar.google.com/event?action=TEMPLATE&amp;tmeid=NGxwbDl0aHI3cWYxbDhxdTRkZDJmanQwdmIga29hdDliOTEyYWhqazBuZmVqaTUydWZhNW9AZw&amp;tmsrc=koat9b912ahjk0nfeji52ufa5o%40group.calendar.google.com"><img border="0" src="https://www.google.com/calendar/images/ext/gc_button1_en.gif">Jan 12th @ 8am PT</a>:  ***Kubernetes Networking Dataplane Offload***

[Teams Meeting](https://www.google.com/url?q=https://teams.microsoft.com/l/meetup-join/19%253ameeting_NjU0Y2M5MzctZmQ0MS00MGY4LWFjNzctYTkyZDNiOGE3Yzll%2540thread.v2/0?context%3D%257b%2522Tid%2522%253a%252246c98d88-e344-4ed4-8496-4ed7712e255d%2522%252c%2522Oid%2522%253a%25221232290d-c824-4050-a582-15598b1d126b%2522%257d&sa=D&source=calendar&usd=2&usg=AOvVaw1MfmZaQUvuUJ1XC8q9IySN)

 Discuss the dataplane model for the networking functions inside Kubernetes,  including stateful firewall, multi-tiered Network Policy, micro-segmentation, dynamic load balancing (using NAT), tunneling and telemetry.  The proposal is to define this dataplane in P4 and instantiate a P4 pipeline as a ‘co-processor’ alongside the network operating system to process packets on its behalf.  This preserves the control planes used to interconnect nodes and services used in Kubernetes while replacing the linux kernel dataplane with a programmable pipeline defined in P4.  This P4 pipeline can be run in software, hardware or some combination, assuming a compiler for that target that can compile the Kubernetes program written in P4_16 using PNA (the Portable NIC Architecture).
