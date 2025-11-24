package com.aupgrade.aupgrade.dto.request;

public record SubmitRequest(
    String name,
    String sector,
    String incomeRange,
    int perc
) {}