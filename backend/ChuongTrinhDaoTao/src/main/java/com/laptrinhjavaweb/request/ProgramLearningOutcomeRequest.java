package com.laptrinhjavaweb.request;

import lombok.Data;

@Data
public class ProgramLearningOutcomeRequest {
	private Long programId;
    private String type;
    private String typeDetail;
    private String symbol;
}
