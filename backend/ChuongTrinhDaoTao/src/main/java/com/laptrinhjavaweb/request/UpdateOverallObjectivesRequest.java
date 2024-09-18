package com.laptrinhjavaweb.request;

import lombok.Data;

@Data
public class UpdateOverallObjectivesRequest {
	private Long programId;
    private String overallObjectives;
}
