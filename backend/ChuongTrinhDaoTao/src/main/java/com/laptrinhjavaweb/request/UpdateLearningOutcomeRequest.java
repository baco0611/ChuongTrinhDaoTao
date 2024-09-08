package com.laptrinhjavaweb.request;

import lombok.Data;

@Data
public class UpdateLearningOutcomeRequest {
	private Long id;
    private String type;
    private String typeDetail;
    private String symbol;
}
