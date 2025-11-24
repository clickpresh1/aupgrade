package com.aupgrade.aupgrade.dto.response;

public record RecommendationResponse(
    String message,
    int yourPercentage,
    double averageAtSector,
    long moreAggressiveThanYou,
    long totalFromYourSector
) {}
