---
title: "Testing"
layout: documentation
visibility: public
---

# IPDK & OPI Testing Goals

1. The check-in build script: ***did my check-in break the build?***
2. The check-in ‘smoke test’ across all supported targets: ***did my check-in break simple functionality on a target?***
3. The regression test suite: ***did we break something along the way?***
4. The target acceptance test suite: ***does my target support IPDK well enough?***
5. The release test suite: ***what tests are passing at the time of release (across targets)?***

## Build Script

Re-build IPDK on an all-software target without any special dependencies (e.g., KVM Target)
 * Validate that the IPDK build completes without any unexpected errors
 * Build an image that can be run in a test

## Smoke Test

Re-build IPDK on all ‘Accepted’ targets
 * Run a simple network traffic test (at speed netperf over some ports)
 * Run a simple storage traffic test (at speed fio over some ports)

Requires:
 * Available ‘bank’ of back-to-back systems for each target
 * Ability to build IPDK for each target (ARM, x86, etc.)
 * Ability to access NDA material for each target
 * Ability to measure the at speed tests and ensure the perf is expected

## Regression Test Suite

Re-build IPDK on all ‘Accepted’ targets
 * Run a more complete set of tests
 * Annotation for which tests should be run on each targete.g. skip the storage tests for Tofino

Requires:
 * Available ‘bank’ of back-to-back systems for each target
 * Ability to build IPDK for each target (ARM, x86, etc.)
 * Ability to access NDA material for each target
 * Ability to measure the at speed tests and ensure the perf is expected
 * Regression scripting for running tests across different targets

## Target Acceptance Test

Running of the regression test suite
 * Testing its adherence to the TAI (Target Abstraction Interface)
 * Tooling for running the suite on this target
   * Marking tests to skip
   * Adjusting P4 programs or device specific configurations required (per test)
   * Scripting for integrating non-IPDK codebases such as the device SDK
   * Annotating expected performance in each of the performance tests
 * Targets can get into the testing program without being in the release
 * Requires systems in the ‘bank’ of available targets to run on

## Release Test Suite

 * Running of the regression test suite
 * Comparing test results w/ expectation for each target
 * Evaluating if a target belongs in the release (or should be left out)

# Components List

1. Test Suites: build, smoke, regression, acceptance, release  
2. testbench: Regression Detection Testbench
3. testkit: packet gen and generic checking, uses OPI Telemetry where needed to read stats, do packet traps and set assertions 
4. ipdcloud: multi-cloud layer for placing images and interconnecting them, gathering stored logs and output and testbench association
5. ipdk-img: Build an IPDK-linked image compatible with ipdcloud
6. sdk-lib: Build a library that can link with applications



